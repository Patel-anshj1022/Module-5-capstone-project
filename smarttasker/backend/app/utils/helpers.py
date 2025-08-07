from datetime import datetime

def format_datetime(value):
    if value is None:
        return None
    return value.isoformat()

def parse_datetime(value):
    if value is None:
        return None
    return datetime.fromisoformat(value)