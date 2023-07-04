import email
import flask
from http import client
from flask import Flask, jsonify, json, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from flask_migrate import Migrate
from jinja2 import pass_environment
from sqlalchemy import cast, Date
from datetime import date
from flask_mail import Mail, Message
from flask_cors import CORS
import psycopg2.extras
from flask.json import JSONEncoder
from datetime import date
import yaml
import json
import math
import numpy as np

app = Flask(__name__)
CORS(app)

passes = yaml.safe_load(open('passes.yaml'))
postgresql_user = passes['postgresql_user']
postgresql_password = passes['postgresql_password']
postgresql_server = passes['postgresql_server']
postgresql_database = passes['postgresql_user']
mail_server = passes['mail_server']
mail_port = passes['mail_port']
mail_username = passes['mail_username']
mail_password = passes['mail_password']
mail_TLS = passes['mail_TLS']
mail_SSL = passes['mail_SSL']

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{postgresql_user}:{postgresql_password}@{postgresql_server}/{postgresql_database}' 
app.config['MAIL_SERVER'] = mail_server
app.config['MAIL_PORT'] = mail_port
app.config['MAIL_USERNAME'] = mail_username
app.config['MAIL_PASSWORD'] = mail_password
app.config['MAIL_USE_TLS'] = mail_TLS
app.config['MAIL_USE_SSL'] = mail_SSL

db = SQLAlchemy(app)
migrate = Migrate(app, db)
mail = Mail(app)

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        try:
            if isinstance(obj, date):
                return obj.isoformat()
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)

app.json_encoder = CustomJSONEncoder

class appointments(db.Model):
    appointment_id = db.Column(db.Integer, primary_key=True)
    appointment_date = db.Column(db.Text)
    client_name = db.Column(db.Text)
    client_surname = db.Column(db.Text)
    client_email = db.Column(db.Text)
    client_phone_number = db.Column(db.Text)

    def __str__(self):
        return f'{self.appointment_id} {self.appointment_date} {self.client_name} {self.client_surname} {self.client_email} {self.client_phone_number}'

class cars(db.Model):
    car_id = db.Column(db.Integer, primary_key=True)
    manufacturer_id = db.Column(db.Integer, db.ForeignKey('manufacturers.manufacturer_id'), nullable=False)
    model = db.Column(db.Text, nullable=False)
    engine = db.Column(db.Text, nullable=False)
    bolt_pattern_id = db.Column(db.Integer, db.ForeignKey('alloys_bps.bp_id'), nullable=False)
    et_id = db.Column(db.Integer, db.ForeignKey('alloys_ets.et_id'), nullable=False) #foreign key to nazwa_tabeli.nazwa_kolumny pisana małymi literami
    cb_id = db.Column(db.Integer, db.ForeignKey('alloys_cbs.cb_id'), nullable=False)

    def __str__(self):
        return f'{self.car_id} {self.manufacturer} {self.model} {self.engine} {self.bolt_pattern_id} {self.et_id} {self.cb_id}'

class manufacturers(db.Model):
    manufacturer_id = db.Column(db.Integer, primary_key=True)
    manufacturer = db.Column(db.Text, nullable=False)
    cars = db.relationship('cars', backref='manufacturer')

    def __str__(self):
        return f'{self.manufacturer_id} {self.manufacturer}'

class alloys(db.Model):
    alloy_id = db.Column(db.Integer, primary_key=True)
    manufacturer = db.Column(db.Text, nullable=False)
    model = db.Column(db.Text, nullable=False)
    catalog_number = db.Column(db.Text, nullable=False)
    sizes = db.Column(db.Text, nullable=False)
    width = db.Column(db.Text, nullable=False)
    colors = db.Column(db.Text, nullable=False)
    ets = db.Column(db.Text, nullable=False)
    bolt_patterns = db.Column(db.Text, nullable=False)
    cb = db.Column(db.Text, nullable=False)
    photo = db.Column(db.Text)

    def __str__(self):
        return f'{self.alloys_id} {self.manufacturer} {self.model} {self.catalog_number} {self.sizes} {self.width} {self.colors} {self.ets} {self.bolt_patterns} {self.cb} {self.photo}'

class alloys_ets(db.Model):
    et_id = db.Column(db.Integer, primary_key=True)
    et = db.Column(db.Float, nullable=False)
    cars = db.relationship('cars', backref='ets')
    
    def __str__(self):
        return f'{self.et_id} {self.et}'

class alloys_bps(db.Model):
    bp_id = db.Column(db.Integer, primary_key=True)
    bolt_pattern = db.Column(db.Text)
    cars2 = db.relationship('cars', backref='bps')

    def __str__(self):
        return f'{self.bp_id} {self.bolt_pattern}'

class alloys_cbs(db.Model):
    cb_id = db.Column(db.Integer, primary_key=True)
    cb = db.Column(db.Float, nullable=False)
    cars = db.relationship('cars', backref='cbs')

    def __str__(self):
        return f'{self.bp_id} {self.bolt_pattern}'

def appointments_serializer(appointment):
    return {
        'appointment_id': appointment.appointment_id,
        'appointment_date': appointment.appointment_date,
        'client_name': appointment.client_name,
        'client_surname': appointment.client_surname,
        'client_email': appointment.client_email,
        'client_phone_number': appointment.client_phone_number
    }

def appointments_serializer2(appointment):
    return {
        'title': 'Zajete',
        'start': appointment.appointment_date
    }

def alloys_ets_serializer(alloys_ets):
    return {
        'et_id': alloys_ets.et_id,
        'et': alloys_ets.et
    }

def alloys_cbs_serializer(alloys_cbs):
    return {
        'cb_id': alloys_cbs.cb_id,
        'cb': alloys_cbs.cb
    }

def alloys_bps_serializer(alloys_bps):
    return {
        'bp_id': alloys_bps.bp_id,
        'bolt_pattern': alloys_bps.bolt_pattern
    }

def alloys_serializer(alloys):
    return {
        'alloy_id': alloys.alloy_id,
        'manufacturer': alloys.manufacturer,
        'model': alloys.model,
        'catalog_number': alloys.catalog_number,
        'sizes': alloys.sizes,
        'width': alloys.width,
        'colors': alloys.colors,
        'bolt_patterns': alloys.bolt_patterns,
        'ets': alloys.ets,
        'cb': alloys.cb,
        'photo': alloys.photo
    }

def comb_cars_metrics_serializer(manufacturer_id, manufacturer, model, engine, alloys_bps, alloys_cbs, alloys_ets):
    return {
        'manufacturer_id': manufacturer_id,
        'manufacturer': manufacturer,
        'model': model,
        'engine': engine,
        'bolt_pattern': alloys_bps,
        'cbs': alloys_cbs,
        'et': alloys_ets
    }

def comb_cars(manufacturer_id, manufacturer):
    return {
        'manufacturer_id': manufacturer_id,
        'manufacturer': manufacturer
    }

def manufacturers_serializer(manufacturers):
    return {
        'manufacturer_id': manufacturers.manufacturer_id,
        'manufacturer': manufacturers.manufacturer
    }

def SQ_serializer(alloy_id, manufacturer, model, catalog_number, sizes, width, colors, ets, bolt_patterns, cb, photo):
    return {
        'alloy_id': alloy_id,
        'manufacturer': manufacturer,
        'model': model,
        'catalog_number': catalog_number,
        'sizes': sizes,
        'width': width,
        'colors': colors,
        'bolt_patterns': bolt_patterns,
        'ets': ets,
        'cb': cb,
        'photo': photo
    }

@app.route('/', methods = ['GET'])
def index():
    return jsonify([*map(appointments_serializer, appointments.query.all())])

@app.route('/katalog-felg', methods = ['GET'])
def wheelCatalog():
    return jsonify([*map(alloys_serializer, alloys.query.all())])

@app.route('/get-appointments', methods = ['GET'])
def makeAppointment2():
    return jsonify([*map(appointments_serializer2, appointments.query.all())]) 
    
@app.route('/get-alloys', methods = ['GET'])
def getCarsAndAlloys():
    return jsonify([*map(alloys_serializer, alloys.query.all())])

@app.route('/get-alloysets', methods = ['GET'])
def alloysETSCatalog():
    return jsonify([*map(alloys_ets_serializer, alloys_ets.query.all())])

@app.route('/get-alloysbps', methods = ['GET'])
def alloysBPSCatalog():
    return jsonify([*map(alloys_bps_serializer, alloys_bps.query.all())])

@app.route('/get-alloyscbs', methods = ['GET'])
def alloysCBSCatalog():
    return jsonify([*map(alloys_cbs_serializer, alloys_cbs.query.all())])

@app.route('/add-car-manufacturer-16782648965927349587367', methods = ['POST','GET'])
def manufacturersCatalog():
    if request.method == 'GET':
        return jsonify([*map(manufacturers_serializer, manufacturers.query.all())])
    if request.method == 'POST':
        request_data = json.loads(request.data)
        manufacturer = manufacturers(
        manufacturer=request_data['manufacturer'])
        db.session.add(manufacturer)
        db.session.commit()
        return {'200': 'OK'}

@app.route('/add-car-model-12436732342345228724584652', methods = ['POST', 'GET'])
def modelCatalog():
    if request.method == 'POST':

        carManufacturerID = 0
        carModel = ''
        carEngine = ''
        carETS = 0
        carCBS = 0
        carBPS = 0

        request_data = json.loads(request.data)
        carManufacturerRequestData = request_data['carManufacturer']
        carModelRequestData = request_data['carModel']
        carEngineRequestData = request_data['carEngine']
        carETSRequestData = request_data['carETS']
        carCBSRequestData = request_data['carCBS']
        carBPSRequestData = request_data['carBPS']

        print(carManufacturerRequestData)
        print(carModelRequestData)
        print(carEngineRequestData)
        print(carETSRequestData)
        print(carCBSRequestData)
        print(carBPSRequestData)

        queryManufacturers = manufacturers.query.filter_by(manufacturer=carManufacturerRequestData).first()
        carManufacturerID = queryManufacturers.manufacturer_id

        queryETS = alloys_ets.query.filter_by(et=carETSRequestData).first()
        carETSID = queryETS.et_id

        queryCBS = alloys_cbs.query.filter_by(cb=carCBSRequestData).first()
        carCBSID = queryCBS.cb_id

        queryBPS = alloys_bps.query.filter_by(bolt_pattern=carBPSRequestData).first()
        carBPSID = queryBPS.bp_id

        car = cars(
        manufacturer_id=carManufacturerID,
        model=carModelRequestData,
        engine=carEngineRequestData,
        bolt_pattern_id=carBPSID,
        et_id=carETSID,
        cb_id=carBPSID)

        db.session.add(car)
        db.session.commit()

        return {'200': 'OK'}
    
    if request.method == 'GET':
        return jsonify([*map(manufacturers_serializer, manufacturers.query.all())])
    
@app.route('/add-alloy-348968392197572812234', methods = ['POST', 'GET'])
def alloyCatalog():
    if request.method == 'POST':

        request_data = json.loads(request.data)
        alloyManufacturerRequestData = request_data['alloyManufacturer']
        alloyModelRequestData = request_data['alloyModel']
        alloyCatalogNumberRequestData = request_data['alloyCatalogNumber']
        alloySizesRequestData = request_data['alloySizes']
        alloyWidthsRequestData = request_data['alloyWidths']
        alloyColorsRequestData = request_data['alloyColors']
        alloyETSRequestData = request_data['alloyETS']
        alloyBPSRequestData = request_data['alloyBPS']
        alloyCBSRequestData = request_data['alloyCBS']
        alloyPhotoRequestData = request_data['alloyPhoto']

        alloy = alloys(
        manufacturer=alloyManufacturerRequestData,
        model=alloyModelRequestData,
        catalog_number=alloyCatalogNumberRequestData,
        sizes=alloySizesRequestData,
        width=alloyWidthsRequestData,
        colors=alloyColorsRequestData,
        ets=alloyETSRequestData,
        bolt_patterns=alloyBPSRequestData,
        cb=alloyCBSRequestData,
        photo=alloyPhotoRequestData)

        db.session.add(alloy)
        db.session.commit()

        return {'200': 'OK'}
    
    if request.method == 'GET':
        return jsonify([*map(alloys_serializer, alloys.query.all())])
    
@app.route('/umow-wizyte', methods = ['GET', 'POST'])
def makeAppointment():
    return {'200': 'OK'}

@app.route('/get-cars', methods = ['GET'])
def getCars():
    return jsonify([*map(manufacturers_serializer, manufacturers.query.all())])

@app.route('/get-cars-and-metrics', methods = ['GET'])
def getCarsAndMetrics():
    res = db.session.query(cars, manufacturers, alloys_bps, alloys_cbs, alloys_ets).join(manufacturers).join(alloys_bps).join(alloys_cbs).join(alloys_ets).all()
    tmp1 = []
    tmp2 = []
    tmp3 = []
    tmp4 = []
    tmp5 = []
    tmp6 = []
    tmp7 = []
    for t1, t2, t5, t6, t7 in res:
        tmp1.append(t1.manufacturer_id)
        tmp2.append(t2.manufacturer)
        tmp3.append(t1.model)
        tmp4.append(t1.engine)
        tmp5.append(t5.bolt_pattern)
        tmp6.append(t6.cb)
        tmp7.append(t7.et)

    return jsonify([*map(comb_cars_metrics_serializer, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7)])

tmp1Glob = [] #alloys_id
tmp2Glob = [] #manufacturers
tmp3Glob = [] #
tmp4Glob = [] #
tmp5Glob = [] #et
tmp6Glob = [] #cb
tmp6Glob = [] #bp
tmp7Glob = []
tmp8Glob = []
tmp9Glob = []
tmp10Glob = []
tmp11Glob = []

@app.route('/result-questions-original', methods = ['GET', 'POST'])
def resultQuestionORIGINAL():
    return jsonify([*map(SQ_serializer, tmp1Glob, tmp2Glob, tmp3Glob, tmp4Glob)])

@app.route('/result-questions', methods = ['GET'])
def resultQuestion():
    return jsonify([*map(SQ_serializer, tmp1Glob, tmp2Glob, tmp3Glob, tmp4Glob, tmp5Glob, tmp6Glob, tmp7Glob, tmp8Glob, tmp9Glob, tmp10Glob, tmp11Glob)])

@app.route('/send-questions', methods = ['POST'])
def sendQuestion():

    carET = 0
    carCB = 0
    carBP = "0"
    carETroundedDown = 0;
    carETroundedUp = 0;

    request_data = json.loads(request.data)
    carModel = request_data['carModel']
    carEngine = request_data['carEngine']
    carDZ = request_data['carDZ']
    carPLP = request_data['carPLP']
    carPLT = request_data['carPLT']

    queryCars = db.session.query(cars, manufacturers, alloys_ets, alloys_cbs, alloys_bps).join(manufacturers).join(alloys_ets).join(alloys_cbs).join(alloys_bps).all()

    print("czyszczę tabele")
    tmp1Glob.clear()
    tmp2Glob.clear()
    tmp3Glob.clear()
    tmp4Glob.clear()
    tmp5Glob.clear()
    tmp6Glob.clear()
    tmp7Glob.clear()
    tmp8Glob.clear()
    tmp9Glob.clear()
    tmp10Glob.clear()
    tmp11Glob.clear()

    for t1, t2, t5, t6, t7 in queryCars:
        carET = (t5.et - float(carDZ))
        carCB = float(t6.cb)
        carBP = t7.bolt_pattern

    carETroundedDown = math.floor(carET)
    carETroundedUp = carETroundedDown + 1

    if carPLP == carPLT:
        if carPLP == 0:
            print("carPLT and carPLT the same equals 0")
            queryAlloys = db.session.query(alloys).filter(or_(alloys.ets.contains(str(carETroundedDown)), alloys.ets.contains(str(carET)), alloys.ets.contains(str(carETroundedUp))), alloys.cb.contains(str(carCB)), alloys.bolt_patterns.contains(str(carBP))).all()
        else:
            print("carPLT and carPLT the same")
            carETcorrectedPLPPLTDown = carETroundedDown - int(carPLP)
            carETcorrectedPLPPLTUp = carETroundedUp - int(carPLP)
            carETcorrectedPLPPLTDown = carETroundedDown - int(carPLP)
            carETcorrectedPLPPLTUp = carETroundedUp - int(carPLP)
            queryAlloys = db.session.query(alloys).filter(or_(alloys.ets.contains(str(carETcorrectedPLPPLTDown)), alloys.ets.contains(str(carETcorrectedPLPPLTDown)), alloys.ets.contains(str(carETcorrectedPLPPLTUp)), alloys.ets.contains(str(carETcorrectedPLPPLTUp))), alloys.cb.contains(str(carCB)), alloys.bolt_patterns.contains(str(carBP))).all()
    else:
        print("carPLP and carPLT not equals")
        carETcorrectedPLP = carETroundedDown - int(carPLP)
        carETcorrectedPLT = carETroundedUp - int(carPLT)
        carETcorrectedPLPDown = carETroundedDown - int(carPLP)
        carETcorrectedPLPUp = carETroundedUp - int(carPLP)
        carETcorrectedPLTDown = carETroundedDown - int(carPLT)
        carETcorrectedPLTUp = carETroundedUp - int(carPLT)
        queryAlloys = db.session.query(alloys).filter(or_(alloys.ets.contains(str(carETcorrectedPLPDown)), alloys.ets.contains(str(carETcorrectedPLTDown)), alloys.ets.contains(str(carETcorrectedPLP)), alloys.ets.contains(str(carETcorrectedPLT)), alloys.ets.contains(str(carETcorrectedPLPUp)), alloys.ets.contains(str(carETcorrectedPLTUp))), alloys.cb.contains(str(carCB)), alloys.bolt_patterns.contains(str(carBP))).all()
        
    print("wpisuję nowe wartości do tmpI...")
    for t1 in queryAlloys:
        tmp1Glob.append(t1.alloy_id)
        tmp2Glob.append(t1.manufacturer)
        tmp3Glob.append(t1.model)
        tmp4Glob.append(t1.catalog_number)
        tmp5Glob.append(t1.sizes)
        tmp6Glob.append(t1.width)
        tmp7Glob.append(t1.colors)
        tmp8Glob.append(t1.ets)
        tmp9Glob.append(t1.bolt_patterns)
        tmp10Glob.append(t1.cb)
        tmp11Glob.append(t1.photo)

    return {'201': 'Car created successfully'}

@app.route('/przymierzalnia-felg', methods = ['GET'])
def przymierzalniaFelg():
    return {'200': 'OK'}
           
@app.route('/umow-wizyte/stworz', methods = ['POST'])
def makeAppointmentCreate():
    deleteAppointment = "http://localhost:3000/odwolaj-wizyte"
    request_data = json.loads(request.data)
    appointment = appointments(
        appointment_date=request_data['appointment_date'],
        client_name=request_data['client_name'],
        client_surname=request_data['client_surname'],
        client_email=request_data['client_email'],
        client_phone_number=request_data['client_phone_number'])

    db.session.add(appointment)
    db.session.commit()

    msg = Message(
                'Potwierdzenie wizyty Przymierzalnia Felg j. Design',
                sender = mail_username,
                recipients = [appointment.client_email]
                )

    msg.html = f"""
                <h1>Dziękujemy za skorzystanie z naszych usług!<h1>
                <h2>Masz u nas umówioną wizytę dnia {appointment.appointment_date}
                <br></br>
                Jeśli chcesz odwołać wizytę kliknij w link poniżej: <br></br>
                <a href="{deleteAppointment}">Odwołaj wizytę</a>
                <h2>
                <p></p>
                <h4>Pozdrawiam, <br></br>
                jdesignofficial2!</h4>
                """

    mail.send(msg)

    return {'201': 'Appointment created successfully'}

@app.route('/umow-wizyte/<appointment_date>')
def makeAppointmentDetail():
    return {'200': 'OK'}

@app.route('/umow-wizyte/check-database-free-days', methods = ['POST'])
def checkDatabaseFreeDays():
    request_data = json.loads(request.data)
    val = appointments.query.filter_by(appointment_date=request_data['appointment_date']).count()

    if (val == 0):
        return {"available": "true"}
    elif (val == 1):
        return {"available": "true"}
    elif (val == 2):
        return {"available": "true"}
    else:
        return {"available": "false"}
    
@app.route('/odwolaj-wizyte', methods = ['POST'])
def unmakeAppointment():
    return {'200': 'OK'}

@app.route('/odwolaj-wizyte/odwolaj', methods = ['POST'])
def unmakeAppointmentExtend():
    request_data = json.loads(request.data)
    appointments.query.filter_by(
        client_phone_number=request_data['client_phone_number'],
        appointment_date=request_data['appointment_date'],
        client_email=request_data['client_email']
        ).delete()
    db.session.commit()

    return {'204': 'Appointment deleted successfully'}

if __name__ == '__main__':
    app.run(debug = True)