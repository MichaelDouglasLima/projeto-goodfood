package com.goodfood.goodfoodbackend.configuration.database;

import com.goodfood.goodfoodbackend.models.Client;
import com.goodfood.goodfoodbackend.models.Nutritionist;
import com.goodfood.goodfoodbackend.models.NutritionistClient;
import com.goodfood.goodfoodbackend.models.User;
import com.goodfood.goodfoodbackend.models.enums.Role;
import com.goodfood.goodfoodbackend.repositories.ClientRepository;
import com.goodfood.goodfoodbackend.repositories.NutritionistClientRepository;
import com.goodfood.goodfoodbackend.repositories.NutritionistRepository;
import com.goodfood.goodfoodbackend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Component
public class InitializeData implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final NutritionistRepository nutritionistRepository;
    private final NutritionistClientRepository nutritionistClientRepository;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        try {
            if (userRepository.findAll().isEmpty()) {
                List<User> users =
                        userRepository.saveAll(
                                List.of(
                                        User.builder()
                                                .name("Administrador")
                                                .email("admin@email.com")
                                                .username("admin")
                                                .password(encoder.encode("123456"))
                                                .role(Role.ADMIN)
                                                .build(),
                                        User.builder()
                                                .name("Cliente Padrão")
                                                .email("cliente@email.com")
                                                .username("cliente")
                                                .password(encoder.encode("123456"))
                                                .role(Role.CLIENT)
                                                .build(),
                                        User.builder()
                                                .name("Nutricionista Padrão")
                                                .email("nutricionista@email.com")
                                                .username("nutricionista")
                                                .password(encoder.encode("123456"))
                                                .role(Role.NUTRITIONIST)
                                                .build()));

                Client client =
                        clientRepository.save(
                                Client.builder()
                                        .height(2.30)
                                        .weight(150.00)
                                        .user(users.get(1))
                                        .build());

                Nutritionist nutritionist =
                        nutritionistRepository.save(
                                Nutritionist.builder().cfn("12345").user(users.get(2)).build());

                nutritionistClientRepository.save(
                        NutritionistClient.builder()
                                .nutritionist(nutritionist)
                                .client(client)
                                .build());
            }

            log.info("Initialized data");
        } catch (Exception exception) {
            log.error(exception.getMessage());
        }
    }
}
