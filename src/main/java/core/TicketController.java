package core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path="/api")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/ticket")
    public Iterable<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/ticket")
    public Ticket newTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path="/ticket")
    public Ticket updateTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path="/ticket")
    public void deleteTicket(@RequestBody Ticket ticket) {
        ticketRepository.delete(ticket);
    }

}
