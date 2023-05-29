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

    /**
     * Create a new purchase record
     * @param purchase the purchase record to be created
     * @return the created purchase record
     */
    @PostMapping
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        return purchaseRepository.save(purchase);
    }

    /**
     * Get a purchase record by its id
     * @param purchaseId the id of the purchase record to be retrieved
     * @return the purchase record
     */
    @GetMapping("/{id}")
    public Purchase getPurchaseById(@PathVariable("id") Long purchaseId) {
        return purchaseRepository.findById(purchaseId)
                .orElseThrow(() -> new RuntimeException("Purchase not found"));
    }
}
