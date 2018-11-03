package core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path="/api")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping(path="/ticket")
    public Iterable<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @PostMapping(path="/ticket")
    public Ticket newTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @PutMapping(path="/ticket")
    public Ticket updateTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @DeleteMapping(path="/ticket")
    public void deleteTicket(@RequestBody Ticket ticket) {
        ticketRepository.delete(ticket);
    }

}
