import { test } from "@playwright/test";

export class TodosService {
  constructor(request) {
    this.request = request;
  }

  async getAll(token, testinfo, acceptHeader = "application/json") {
    return test.step("GET /todos - получить все задачи", async () => {
      const response = await this.request.get(`${testinfo.project.use.baseURL}/todos`, {
        headers: { 
          "X-CHALLENGER": token,
          "Accept": acceptHeader
        }
      });
      return response;
    });
  }async getById(id, token, testinfo) {
    return test.step(`GET /todos/${id} - получить задачу по id`, async () => {
      const response = await this.request.get(`${testinfo.project.use.baseURL}/todos/${id}`, {
        headers: { 
          "X-CHALLENGER": token
        }
      });
      return response;
    });
  }

  async create(token, testinfo, data) {
    return test.step("POST /todos - создать новую задачу", async () => {
      const response = await this.request.post(`${testinfo.project.use.baseURL}/todos`, {
        headers: { 
          "X-CHALLENGER": token,
          "Content-Type": "application/json"
        },
        data: data
      });
      return response;
    });
  }

  async update(id, token, testinfo, data) {
    return test.step(`PUT /todos/${id} - обновить задачу`, async () => {
      const response = await this.request.put(`${testinfo.project.use.baseURL}/todos/${id}`, {
        headers: { 
          "X-CHALLENGER": token,
          "Content-Type": "application/json"
        },
        data: data
      });
      return response;
    });
  }

  async patch(id, token, testinfo, data) {
    return test.step(`PATCH /todos/${id} - частичное обновление задачи`, async () => {
      const response = await this.request.patch(`${testinfo.project.use.baseURL}/todos/${id}`, {
        headers: { 
          "X-CHALLENGER": token,
          "Content-Type": "application/json"
        },
        data: data
      });
      return response;
    });
  }

  async delete(id, token, testinfo) {
    return test.step(`DELETE /todos/${id} - удалить задачу`, async () => {
      const response = await this.request.delete(`${testinfo.project.use.baseURL}/todos/${id}`, {
        headers: { 
          "X-CHALLENGER": token
        }
      });
      return response;
    });
  }
}