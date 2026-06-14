from django.db import models
from login_app.models import User


class Message(models.Model):
    content    = models.TextField()
    sender     = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    recipient  = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
