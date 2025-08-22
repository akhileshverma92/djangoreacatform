from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Submission
from .serializers import SubmissionSerializer

@api_view(['POST'])
def submit_form(request):
    serializer = SubmissionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Form submitted successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def view_submissions(request):
    submissions = Submission.objects.all().order_by('-created_at')
    serializer = SubmissionSerializer(submissions, many=True)
    return Response(serializer.data)
