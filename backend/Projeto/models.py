from django.db import models
from django.contrib.auth.models import User
from django.conf import settings 

# Create your models here.
class Projeto(models.Model):
    
    STATUS_CHOICES = (
        ('aberto', 'Aberto'),
        ('fechado', 'Fechado'),
        ('cancelado', 'Cancelado'),
        ('concluido', 'Concluido'),
        ('em_andamento', 'Em Andamento'),
        ('pendente', 'Pendente'),
        ('reaberto', 'Reaberto'),
        ('resolvido', 'Resolvido'),
        ('rejeitado', 'Rejeitado'),
        ('suspensao', 'Suspensão'),
        ('suspensao_permanente', 'Suspensão Permanente'),
        ('suspensao_temporaria', 'Suspensão Temporária'),
    )
    
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    data = models.DateField()
    imagem = models.ImageField(upload_to='images/', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    progresso = models.FloatField(default=0.0)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nome
    
    