FROM python:3.12

# create working directory
WORKDIR /app

# install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy application code
COPY . .

# Expose port the app will run on
EXPOSE 8000

# make new current directory
WORKDIR /app/backend

# Command that the container runs
ENTRYPOINT ["/bin/bash", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
