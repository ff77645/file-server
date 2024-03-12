export class ResultError {
  constructor(message) {
    this.success = false
    this.message = message || 'Error'
  }
}

export class ResultSuccess {
  constructor(data,message) {
    this.success = true;
    this.message = message || 'Success'
    this.data = data
  }
}