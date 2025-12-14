package com.sweetshop.backend.config;

import com.sweetshop.backend.model.Sweet;
import com.sweetshop.backend.model.User;
import com.sweetshop.backend.repository.SweetRepository;
import com.sweetshop.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(SweetRepository sweetRepository, UserRepository userRepository,
            com.sweetshop.backend.repository.OrderRepository orderRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Init Users (only if they don't exist)
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("password"));
                admin.setRole(User.Role.ROLE_ADMIN);
                userRepository.save(admin);
            }

            if (!userRepository.existsByUsername("user")) {
                User user = new User();
                user.setUsername("user");
                user.setPassword(passwordEncoder.encode("password"));
                user.setRole(User.Role.ROLE_USER);
                userRepository.save(user);
            }

            // Init Sweets (only if database is empty)
            if (sweetRepository.count() == 0) {
                // Chocolate Category
                sweetRepository.save(new Sweet(null, "Chocolate Fudge", "Chocolate", new BigDecimal("5.99"), 100,
                        "Rich and creamy chocolate fudge.",
                        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Dark Chocolate Truffles", "Chocolate", new BigDecimal("8.99"), 75,
                        "Handmade dark chocolate truffles with cocoa powder.",
                        "https://images.unsplash.com/photo-1548848979-47519fe7d1c6?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Milk Chocolate Bar", "Chocolate", new BigDecimal("3.99"), 150,
                        "Classic creamy milk chocolate bar.",
                        "https://images.unsplash.com/photo-1606312619070-d48b4cda81f5?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "White Chocolate Bark", "Chocolate", new BigDecimal("6.99"), 60,
                        "White chocolate bark with nuts and dried fruits.",
                        "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400&h=400&fit=crop"));

                // Cake Category
                sweetRepository.save(new Sweet(null, "Strawberry Cupcake", "Cake", new BigDecimal("3.50"), 50,
                        "Fluffy cupcake with strawberry frosting.",
                        "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Blueberry Cheesecake", "Cake", new BigDecimal("25.00"), 10,
                        "Classic cheesecake with blueberry topping.",
                        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Red Velvet Cake", "Cake", new BigDecimal("22.00"), 15,
                        "Moist red velvet cake with cream cheese frosting.",
                        "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Chocolate Brownie", "Cake", new BigDecimal("4.50"), 80,
                        "Fudgy chocolate brownie with walnuts.",
                        "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=400&fit=crop"));

                // Candy Category
                sweetRepository.save(new Sweet(null, "Gummy Bears", "Candy", new BigDecimal("2.99"), 200,
                        "Assorted fruit flavored gummy bears.",
                        "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Lollipops", "Candy", new BigDecimal("1.99"), 150,
                        "Colorful swirl lollipops in various flavors.",
                        "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Sour Gummy Worms", "Candy", new BigDecimal("3.49"), 120,
                        "Tangy sour gummy worms.",
                        "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Jelly Beans", "Candy", new BigDecimal("2.49"), 180,
                        "Mixed flavor jelly beans.",
                        "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=400&fit=crop"));

                // Cookie Category
                sweetRepository.save(new Sweet(null, "Macarons", "Cookie", new BigDecimal("12.99"), 30,
                        "French almond meringue cookies.",
                        "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Chocolate Chip Cookies", "Cookie", new BigDecimal("5.99"), 90,
                        "Classic homemade chocolate chip cookies.",
                        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Oatmeal Raisin Cookies", "Cookie", new BigDecimal("5.49"), 70,
                        "Chewy oatmeal cookies with plump raisins.",
                        "https://images.unsplash.com/photo-1590080876876-7e2e7f7e8f6f?w=400&h=400&fit=crop"));
                sweetRepository.save(new Sweet(null, "Sugar Cookies", "Cookie", new BigDecimal("4.99"), 100,
                        "Soft sugar cookies with colorful icing.",
                        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop"));
            }
        };
    }
}
