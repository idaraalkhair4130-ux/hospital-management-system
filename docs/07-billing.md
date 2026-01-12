# 💰 Billing Module APIs

## Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/billing/create` | Create a new bill |
| `GET` | `/api/billing/{billId}` | Get bill details |
| `POST` | `/api/billing/add-item` | Add item to existing bill |
| `POST` | `/api/billing/pay` | Process payment |
| `GET` | `/api/billing/receipt` | Generate receipt |

## Integration Flow (Example)
1. **Reception** generates token.
2. **Doctor** module provides fee info via API.
3. **Pharmacy** module provides medicine costs via API.
4. **Ward** module provides stay charges via API.
5. **Billing** module combines all costs and creates final bill.
