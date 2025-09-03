# --- Stage 1: Build ---
FROM node:20

WORKDIR /app

# فقط فایل‌های ضروری برای نصب dependencies
COPY package*.json ./

# نصب dependencies
RUN npm install

# کپی کل سورس بک‌اند
COPY . .

# کانفیگ پورت (همون پورتی که اپ توش اجرا میشه، مثلا 5000)
EXPOSE 5000

# استارت اپ
CMD ["npm", "start"]
