import { test, expect } from "@playwright/test";
//import { ChallengerService } from "../src/services/index";
//import { Api } from "../src/services/api.service";
//import { TodosService } from "../src/services/todos.service";
let token;

test.describe("Challenge API", () => {
  // Сначала создаем сессию и получаем токен
  test("01 POST /challenger должен создать новую сессию и вернуть токен", { tag: '@API' }, async ({ request }, testinfo) => {
    // Выполняем POST запрос к /challenger без тела запроса
    const response = await request.post(`${testinfo.project.use.baseURL}/challenger`);
    // Проверяем, что статус ответа равен 201 (Created)
    expect(response.status()).toBe(201);
    // Проверяем, что в заголовках присутствует X-CHALLENGER токен
    const headers = response.headers();
    expect(headers).toHaveProperty('x-challenger');
    // Сохраняем токен для использования в последующих тестах
    token = headers["x-challenger"];
    expect(token).toBeDefined();
    expect(token).not.toBe('');
    // Выводим токен для отладки с полным URL
    console.log(`${testinfo.project.use.baseURL}/gui/challenges/${token}`);
  });

  // Затем используем этот токен для получения списка задач
  test("02 GET /challenges (200) - получить список challenge задач", { tag: '@API' }, async ({ request }, testinfo) => {
    let getResponse = await request.get(`${testinfo.project.use.baseURL}/challenges`, {
      headers: { "x-challenger": token },
    });
    // Проверяем, что статус ответа равен 200 (OK)
    expect(getResponse.status()).toBe(200);
    // Парсим JSON ответ от сервера
    const responseBody = await getResponse.json();
    // Проверяем, что количество задач равно ожидаемому значению
    expect(responseBody.challenges.length).toBe(59);
  });

  // Третий тест для получения todos
  test("03 GET /todos (200) - получить список todos задач", { tag: '@API' }, async ({ request }, testinfo) => {
    let getResponse = await request.get(`${testinfo.project.use.baseURL}/todos`, {
      headers: { "x-challenger": token },
    });
    // Проверяем, что статус ответа равен 200 (OK)
    expect(getResponse.status()).toBe(200);
    // Парсим JSON ответ от сервера
    const responseBody = await getResponse.json();
    // Проверяем, что ответ содержит данные
    expect(responseBody).toBeDefined();
  });
});


