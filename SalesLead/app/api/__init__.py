# app/api/__init__py

from flask import Blueprint
from flask_restful import Api

# resource for handling multiple jobs
from app.api.resources.jobs import Jobs

# resource for handling single jobs
from app.api.resources.jobsingle import JobSingle

api_blueprint = Blueprint('api', __name__)

# wrap the blue print as an API object
api = Api(api_blueprint)

# Provide endpoints
api.add_resource(Jobs, '/jobs', '/jobs/<string:job_status>')
#api.add_resource(Jobs, '/jobs/<string:job_status>')
api.add_resource(JobSingle, '/job', '/job/<int:job_id>')
