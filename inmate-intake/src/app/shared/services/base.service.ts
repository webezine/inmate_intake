import { throwError } from 'rxjs';

export abstract class BaseService {
  constructor() {}

  protected handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');

    // application error in header / model error >> body
    if (applicationError) {
      return throwError(applicationError);
    }

    let modelStateErrors = '';

    // output the error descriptions for debugging
    for (const key in error.error) {
      if (error.error[key]) {
        modelStateErrors += error.error[key].description + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return throwError(modelStateErrors || 'Server error');
  }

  public log(operation: string = 'operation', message: string) {
    console.log(`ServiceLog: ${operation}: ${message}`);
  }
}
