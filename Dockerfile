FROM httpd:latest

# Set ServerName to suppress warnings
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Remove default Apache HTML files
RUN rm -rf /usr/local/apache2/htdocs/*

# Copy the locally built React files into Apache's web root
COPY dist/ /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Start Apache in foreground mode
CMD ["httpd", "-D", "FOREGROUND"]
