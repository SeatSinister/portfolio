# Настройка EmailJS для отправки формы

## Инструкция по настройке

Для того чтобы форма контактов реально отправляла сообщения на ваш email, нужно настроить EmailJS.

### Шаг 1: Регистрация на EmailJS

1. Перейдите на https://www.emailjs.com/
2. Зарегистрируйтесь (бесплатно)
3. Войдите в свой аккаунт

### Шаг 2: Создание Email Service

1. В панели управления перейдите в "Email Services"
2. Нажмите "Add New Service"
3. Выберите ваш email провайдер (Gmail, Outlook и т.д.)
4. Следуйте инструкциям для подключения
5. Скопируйте **Service ID** (например: `service_xxxxx`)

### Шаг 3: Создание Email Template

1. Перейдите в "Email Templates"
2. Нажмите "Create New Template"
3. Настройте шаблон:
   - **To Email:** `markarov19@bk.ru` (ваш email)
   - **Subject:** `Сообщение с портфолио от {{from_name}}`
   - **Content:**
   ```
   Имя: {{from_name}}
   Email: {{from_email}}
   Телефон: {{phone}}
   
   Сообщение:
   {{message}}
   ```
4. Сохраните шаблон
5. Скопируйте **Template ID** (например: `template_xxxxx`)

### Шаг 4: Получение Public Key

1. Перейдите в "Account" → "General"
2. Найдите "Public Key"
3. Скопируйте ваш **Public Key**

### Шаг 5: Обновление кода

Откройте файл `script.js` и найдите строки:

```javascript
const serviceID = 'YOUR_SERVICE_ID'; // Замените на ваш Service ID
const templateID = 'YOUR_TEMPLATE_ID'; // Замените на ваш Template ID
const publicKey = 'YOUR_PUBLIC_KEY'; // Замените на ваш Public Key
```

Замените:
- `YOUR_SERVICE_ID` на ваш Service ID
- `YOUR_TEMPLATE_ID` на ваш Template ID  
- `YOUR_PUBLIC_KEY` на ваш Public Key

Также найдите строку в начале файла:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

И замените `YOUR_PUBLIC_KEY` на ваш Public Key.

### Готово!

После настройки форма будет отправлять сообщения прямо на ваш email без открытия почтового клиента.

## Альтернатива (без EmailJS)

Если не хотите использовать EmailJS, форма будет работать через mailto (откроется почтовый клиент пользователя).
