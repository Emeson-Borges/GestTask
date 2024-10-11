from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Projeto
from .serializers import ProjetoSerializers


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])  # Garante que o usuário esteja autenticado
def projeto_list(request):
    if request.method == "GET":
        projeto = Projeto.objects.all()
        serializer = ProjetoSerializers(projeto, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = ProjetoSerializers(data=request.data)
        if serializer.is_valid():
            # Usa o usuário autenticado e salva no campo 'usuario'
            serializer.save(usuario=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])  # Garante que o usuário esteja autenticado
def projeto_detail(request, pk):
    try:
        projeto = Projeto.objects.get(pk=pk)
    except Projeto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        projeto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == "GET":
        serializer = ProjetoSerializers(projeto)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = ProjetoSerializers(projeto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
