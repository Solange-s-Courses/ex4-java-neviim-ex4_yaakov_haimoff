package hac.repo;

import hac.repo.beans.Cart;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.context.annotation.SessionScope;

@Configuration
public class BeanConfiguration {

    @Bean
    @Scope("singleton")
    public Cart autowiredFieldSingletonScope() {
        return new Cart();
    }

    @Bean
    @SessionScope
    public Cart sessionScopeBean() {
        return new Cart();
    }

}
