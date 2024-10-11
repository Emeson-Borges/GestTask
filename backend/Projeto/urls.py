#faça as rotas da Api
from django.urls import path, include 
from .views import projeto_list, projeto_detail

urlpatterns = [
    path('projetos/', projeto_list, name='projetos'),
    # crie uma rota para pegar por id
    # path('projetos/<int:pk>/', projeto_list, name='projetos'),
    path('projetos/<pk>/', projeto_detail, name='projetos_detail')

]

