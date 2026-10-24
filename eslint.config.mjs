import js from "@eslint/js";  // импортирует пакет @eslint/js внутри которого лежит объект js со свойством configs.recommended — рекомендованный набор правил
import globals from "globals";   // импортирует пакет globals - библиотеку для описания глобальных переменных для разных окружений (globals.browser, globals.node, globals.es2021 и т.д.)
import { defineConfig } from "eslint/config";   // импорт вспомогательной функции defineConfig (принимает массив конфигураций и возвращает его же, но с проверками)
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    // первый объект конфигурации применятся к файлам с расширением .js, .mjs, .cjs в любой папке
    files: ["**/*.{js,mjs,cjs}"],
    // Регистрирует плагин js под именем js, чтобы в extends можно было ссылаться на его наборы правил как "js/recommended"
    plugins: { js },
    // Подключает рекомендованный набор правил из плагина js
    extends: ["js/recommended"],
    // Указывает, что код выполняется в браузере: добавляет глобальные переменные window, document, console, alert, localStorage и т.д.
    languageOptions: { globals: globals.browser }, 
    rules: {
      // запрет на использование var
      "no-var": "error",
      // требует использовать const, а не let (если переменная не переопределяется)
      "prefer-const": "error",
      // предупреждает об использовании console.*
      "no-console": "warn"
    }
  },
  {
    // второй объект конфигурации применяется только к .js файлам
    files: ["**/*.js"],
    // говорит линтеру, что js-код — классический браузерный скрипт, а не ES-модуль
    languageOptions: { sourceType: "script" }
  },
  // для того чтобы ESLint приглушил форматирование кода и предоставил форматированием занимать Prettier форматтеру 
  eslintConfigPrettier,
]);
