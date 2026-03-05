import {Folder} from "../../../../../api-docs/decorators/folder";
import {Post} from "../../../../../api-docs/decorators/methods";

@Folder('Something')
export class SomethingController {
  @Post('/')
  static async test() {

  }
}
