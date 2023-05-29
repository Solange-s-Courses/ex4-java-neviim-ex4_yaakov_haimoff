package hac.repo;

import hac.repo.beans.Cart;
import hac.repo.beans.Purchase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

@Configuration
public class BeanConfiguration {

    @Bean
    @SessionScope
    public Cart sessionScopeBeanCart() {
        return new Cart();
    }

    @Bean
    @SessionScope
    public Purchase sessionScopeBeanPurchase() {
        return new Purchase();
    }

}
