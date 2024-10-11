from rest_framework import serializers
from .models import Projeto

class ProjetoSerializers(serializers.ModelSerializer):
    username = serializers.CharField(source='usuario.username')  # Inclui o nome do usuário
    class Meta:
        model = Projeto
        fields = '__all__'