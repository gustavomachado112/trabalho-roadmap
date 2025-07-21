from dataclasses import dataclass
from typing import Optional
import datetime

@dataclass
class Tarefa:
    tarefa_id: int
    usuario_id: int
    nome_tarefa: str
    data_expirar: Optional[datetime.datetime] = None
    descricao_tarefa: Optional[str] = None

    def __str__(self):
        data_formatada = self.data_expirar.strftime('%d/%m/%Y %H:%M') if self.data_expirar else "Sem prazo"
        return (f"ID da Tarefa: {self.tarefa_id}\n"
                f"Usuário: {self.usuario_id}\n"
                f"Título: {self.nome_tarefa}\n"
                f"Prazo: {data_formatada}\n"
                f"Detalhes: {self.descricao_tarefa}\n")

print("Agenda Dos Guris")

# Exemplos
tarefa_gp_interlagos = Tarefa(
    tarefa_id=201,
    usuario_id=1,
    nome_tarefa="Assistir ao GP de São Paulo (Interlagos)",
    data_expirar=datetime.datetime(2025, 11, 9, 14, 0, 0),
    descricao_tarefa="Preparar os snacks, chamar os amigos e torcer pela corrida mais emocionante do ano!"
)
print("GP De Interlagos")
print(tarefa_gp_interlagos)
print("\n")

tarefa_estudo_python = Tarefa(
    tarefa_id=202,
    usuario_id=1,
    nome_tarefa="Estudar Estruturas de Dados em Python",
    data_expirar=datetime.datetime(2025, 7, 28, 19, 0, 0),
    descricao_tarefa="Revisar listas, tuplas, dicionários e conjuntos. Fazer exercícios práticos."
)
print("Meta de Estudo:")
print(tarefa_estudo_python)
