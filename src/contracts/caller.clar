(define-data-var curr int 0)
(define-public (incrementCurr)
  (begin
    (var-set curr (+ (var-get curr) 1))
    (if (is-eq (var-get curr) 3)
      (ok "You won! Check your prize") (ok "Try again!"))))