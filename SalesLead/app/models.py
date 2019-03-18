# app/models.py

# coding: utf-8
from sqlalchemy import Column, ForeignKey, String, TIMESTAMP, Text, text
from sqlalchemy.dialects.mysql import INTEGER
from sqlalchemy.orm import relationship

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Category(db.Model):
    __tablename__ = 'categories'

    id = Column(INTEGER(11), primary_key=True)
    name = Column(String(255), nullable=False)
    parent_category_id = Column(INTEGER(11), nullable=False, index=True, server_default=text("'0'"))


class Suburb(db.Model):
    __tablename__ = 'suburbs'

    id = Column(INTEGER(11), primary_key=True)
    name = Column(String(255), nullable=False)
    postcode = Column(String(4), nullable=False, index=True)


class Job(db.Model):
    __tablename__ = 'jobs'

    id = Column(INTEGER(11), primary_key=True)
    status = Column(String(50), nullable=False, server_default=text("'new'"))
    suburb_id = Column(ForeignKey('suburbs.id'), nullable=False, index=True)
    category_id = Column(ForeignKey('categories.id'), nullable=False, index=True)
    contact_name = Column(String(255), nullable=False)
    contact_phone = Column(String(255), nullable=False)
    contact_email = Column(String(255), nullable=False)
    price = Column(INTEGER(3), nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, server_default=text("CURRENT_TIMESTAMP"))
    updated_at = Column(TIMESTAMP, nullable=False, server_default=text("'2019-01-01 00:00:00'"))

    category = relationship('Category')
    suburb = relationship('Suburb')

