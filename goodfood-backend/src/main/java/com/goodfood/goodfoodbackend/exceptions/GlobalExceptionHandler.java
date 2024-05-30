package com.goodfood.goodfoodbackend.exceptions;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  @NonNull HttpHeaders headers,
                                                                  @NonNull HttpStatusCode status, @NonNull WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.UNPROCESSABLE_ENTITY,
                "Validation error. Check 'errors' field for details.",
                request.getDescription(true)
                        .split(";")[0]
                        .split("=")[1]);

        ex.getBindingResult().getFieldErrors()
                .forEach(fieldError -> errorResponse.addError(fieldError.getField(), fieldError.getDefaultMessage()));

        return handleExceptionInternal(
                ex, errorResponse, new HttpHeaders(), HttpStatusCode.valueOf(status.value()), request);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleNotFound(Exception exception, HttpServletRequest httpRequest,
                                                 WebRequest webRequest) {
        HttpStatus status = HttpStatus.NOT_FOUND;

        return handleExceptionInternal(exception,
                new ErrorResponse(status, exception.getMessage(), httpRequest.getRequestURI()),
                new HttpHeaders(), HttpStatusCode.valueOf(status.value()), webRequest);
    }

    @ExceptionHandler({IllegalStateException.class, IllegalArgumentException.class})
    public ResponseEntity<Object> handleBadRequest(Exception exception, HttpServletRequest httpRequest,
                                                   WebRequest webRequest) {
        HttpStatus status = HttpStatus.BAD_REQUEST;

        return handleExceptionInternal(exception,
                new ErrorResponse(status, exception.getMessage(), httpRequest.getRequestURI()),
                new HttpHeaders(), HttpStatusCode.valueOf(status.value()), webRequest);
    }

    @ExceptionHandler({RuntimeException.class, Exception.class})
    public ResponseEntity<Object> handleInternalServerError(Exception exception, HttpServletRequest httpRequest,
                                                            WebRequest webRequest) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        return handleExceptionInternal(exception,
                new ErrorResponse(status, exception.getMessage(), httpRequest.getRequestURI()),
                new HttpHeaders(), HttpStatusCode.valueOf(status.value()), webRequest);
    }

}
