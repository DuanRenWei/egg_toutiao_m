class HttpException extends Error {
  constructor(response, data) {
    super()
    const { errno, errmsg, status } = response
    this.errno = errno
    this.status = status
    this.errmsg = errmsg
    this.data = data
  }
}

module.exports = HttpException