(define-data-var curr int 0)
(define-private (resetCurr) (begin (var-set curr 0 ) (ok "You won")))
(define-public (incrementCurr)
  (begin (var-set curr (+ (var-get curr) 1))
    (if (is-eq (var-get curr) 3)
      (resetCurr) (ok "Try again"))))