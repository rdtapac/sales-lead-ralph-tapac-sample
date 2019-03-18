# app/api/resources/Jobs.py

from flask import jsonify
from flask_restful import Resource, reqparse
from app.models import db, Job
from sqlalchemy.orm.exc import NoResultFound


class Jobs(Resource):
    def get(self, job_status=None):
        try:
            job_list = []

            if job_status is not None:
                job_rows = Job.query.filter_by(status=job_status).all()
            else:
                job_rows = Job.query.all()

            if len(job_rows) == 0:
                raise NoResultFound("No jobs found with '" + job_status + "' status")

            for job in job_rows:
                address = (job.suburb.name, job.suburb.postcode)
                address_formatted = " ".join(address)

                date_parts = (
                    job.created_at.strftime('%B %d, %Y'),
                    job.created_at.strftime('%I %p')
                )
                date_parts_formatted = " @ ".join(date_parts)

                job_details = {
                    'job_id': job.id,
                    'contact_name': job.contact_name,
                    'contact_phone': job.contact_phone,
                    'created_at': date_parts_formatted,
                    'desc': job.description,
                    'price': job.price,
                    'category': job.category.name,
                    'address': address_formatted
                }

                job_list.append(job_details)

                status = 200
                message = 'success'
                result = job_list

        except NoResultFound as e:
            status = 204
            message = 'error'
            result = str(e)

        return jsonify({"status": status, "message": message, "result": result})
