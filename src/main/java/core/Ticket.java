package core;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Ticket {

    @Id
    private String id;

    private String description;

    private String category;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }
}
