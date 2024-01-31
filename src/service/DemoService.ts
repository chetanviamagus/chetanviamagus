import BaseApiService from "./BaseApiService";

const DEFAULT_PATH = "/posts";

class DemoService extends BaseApiService {
  getAll(start = 0, limit = 10, search = "") {
    let url = this.getDefaultApiUrl();
    url = `${url}${DEFAULT_PATH}?_start=${start}&_limit=${limit}${search}`;
    return this.getAxios().get(url);
  }
  save(obj: any) {
    let url = this.getDefaultApiUrl();
    url = `${url}${DEFAULT_PATH}`;
    return this.getAxios().post(url, { ...obj });
  }
  update() {
    console.log("update");
  }
  delete() {
    console.log("delete");
  }
  findById(id: string) {
    console.log(id);
  }
}

export default new DemoService();
