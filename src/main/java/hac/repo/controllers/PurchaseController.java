package hac.repo.controllers;

import hac.repo.PurchaseRepository;
import hac.repo.beans.Purchase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {

    private final PurchaseRepository purchaseRepository;

    @Autowired
    public PurchaseController(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    @PostMapping
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        // Perform any necessary validations or business logic
        // before saving the purchase
        // ...

        return purchaseRepository.save(purchase);
    }

    @GetMapping("/{id}")
    public Purchase getPurchaseById(@PathVariable("id") Long purchaseId) {
        return purchaseRepository.findById(purchaseId)
                .orElseThrow(() -> new RuntimeException("Purchase not found"));
    }

    // Add more methods as needed for updating, deleting, or querying purchases
    // ...
}
