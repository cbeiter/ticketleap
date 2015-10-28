from django.shortcuts import render
from django.http import HttpResponse

from . import models

def home(request):
    return render(request, 'main.html', {})

def vistar(request):
    return render(request, 'vistar.html', {})