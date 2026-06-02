from django.db import models


class Winner(models.Model):
    name = models.CharField(max_length=100)
    attempts = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.attempts} attempts"
