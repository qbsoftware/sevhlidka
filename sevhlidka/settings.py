"""
Django settings for sevhlidka project.
"""

from django.utils.translation import gettext_lazy as _
from leprikon.site.settings import *

# Application definition
INSTALLED_APPS = [
    "sevhlidka",
] + INSTALLED_APPS

TEXT_EDITOR_SETTINGS = {
    "inlineStyles": [],
    "blockStyles": [
        {
            "name": "Informativní text",
            "element": "div",
            "attributes": {"class": "zvyrazneni_blue"},
        },
        {
            "name": "Varovný text",
            "element": "div",
            "attributes": {"class": "zvyrazneni"},
        },
    ],
    "textColors": {},
}

# set by CSS
LEPRIKON_API_UNAVAILABLE_DATE_COLOR = None
