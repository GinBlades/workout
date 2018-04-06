import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";

@Injectable()
export class AppService {
  public apiHost = environment.apiHost;

  constructor() { }

}
