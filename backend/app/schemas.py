from pydantic import BaseModel, Field

class LoanRequest(BaseModel):
    age: int
    income: float
    credit_score: float
    employment_type: int
    loan_amount: float
    existing_loans: float
    spending_ratio: float

# class LoanRequest(BaseModel):

#     age: int = Field(..., gt=18, lt=100)
#     income: float = Field(..., gt=0)
#     credit_score: int = Field(..., ge=300, le=850)
#     employment_type: int = Field(..., ge=0, le=2)
#     loan_amount: float = Field(..., gt=0)
#     existing_loans: int = Field(..., ge=0)
#     spending_ratio: float = Field(..., ge=0, le=1)


# class LoanRequest(BaseModel):
#     gender: str
#     married: str
#     dependents: int
#     education: str
#     self_employed: str
#     applicant_income: float
#     coapplicant_income: float
#     loan_amount: float
#     loan_amount_term: float
#     credit_history: float
#     property_area: str