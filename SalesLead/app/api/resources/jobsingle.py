# app/api/resources/Jobs.py

from flask import request, jsonify
from flask_restful import Resource
from app.models import db, Job
from sqlalchemy.orm.exc import NoResultFound


class JobSingle(Resource):
    def get(self, job_id=None, return_as_obj=False):

        try:
            job_item = Job.query.filter_by(id=job_id).one()

            if not isinstance(job_item, Job):
                raise NoResultFound("Job ID: " + str(job_id) + " not found")

            address = (job_item.suburb.name, job_item.suburb.postcode)
            address_formatted = " ".join(address)

            date_parts = (
                job_item.created_at.strftime('%B %d, %Y'),
                job_item.created_at.strftime('%I %p')
            )
            date_parts_formatted = " @ ".join(date_parts)

            job_details = {
                'contact_name': job_item.contact_name,
                'created_at': date_parts_formatted,
                'desc': job_item.description,
                'price': job_item.price,
                'category': job_item.category.name,
                'address': address_formatted
            }
            message = 'success'

        except NoResultFound as e:
            if return_as_obj is True:
                return None
            else:
                message = 'error'
                job_details = str(e)

        if return_as_obj is True:
            return job_item
        else:
            return jsonify({'message': message, 'result': job_details})

    def put(self, job_id):

        allowed_status = ('accepted', 'declined', 'new')

        new_status = request.form['status']

        try:
            if new_status not in allowed_status: # validate if value is acceptable
                raise ValueError('Allowed status are "accepted", "declined" or "new"')

            job_row = self.get(job_id, True)

            if not isinstance(job_row, Job):
                raise NoResultFound("Job ID: " + str(job_id) + " not found")

            # update job status
            job_row.status = new_status
            db.session.commit()

            status = 200
            message = 'success'
            result = "Job %d has been updated" % job_id

        except Exception as e:
            status = 400
            message = 'error'
            result = str(e)

        return jsonify({"status": status, "message": message, "result": result})
