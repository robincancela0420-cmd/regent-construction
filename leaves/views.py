from django.shortcuts import render
from rest_framework import viewsets
from .models import Leave
from .serializers import LeaveSerializer

class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all().order_by('-create_at')
    serializer_class = LeaveSerializer