from django.urls import path
from .views import submit_form, view_submissions

urlpatterns = [
    path('submit/', submit_form),
    path('view/', view_submissions),
]
