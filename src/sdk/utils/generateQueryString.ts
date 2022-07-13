function generateQueryString(
  params: { [key: string]: string | number | boolean | string[] | undefined }
): string {
  const convertedParams: { [key: string]: string } = {}

  Object
    .keys(params)
    .forEach((key: string): void => {
      const param: string | number | boolean | string[] | undefined = params[key]
      if (param)
        convertedParams[key] = String(param)
    })

  const urlParams: URLSearchParams = new URLSearchParams(convertedParams)

  return `?${urlParams.toString()}`
}

export default generateQueryString