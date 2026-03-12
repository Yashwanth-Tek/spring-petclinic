package org.springframework.samples.petclinic.vet;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vets")
class VetRestController {

	private final VetRepository vetRepository;

	public VetRestController(VetRepository vetRepository) {
		this.vetRepository = vetRepository;
	}

	@GetMapping
	public Vets getVets() {
		Vets vets = new Vets();
		vets.getVetList().addAll(this.vetRepository.findAll());
		return vets;
	}

}
