package com.example.taskmanager.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @Column(length = 1000)
    private String description;
    private boolean completed;

    // Constructors
    public Task() {}

    public Task(String title, String description, boolean completed) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    //Setters and Getters

    public void setId(Long id) {

        this.id = id;
    }

    public void setTitle(String title) {

        this.title = title;
    }

    public void setDescription(String description) {

        this.description = description;
    }

    public void setCompleted(boolean completed) {

        this.completed = completed;
    }

    public Long getId() {

        return id;
    }

    public String getTitle() {

        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {

        return completed;
    }

    @Override
    public String toString() {
        return "Task{id=" + id + ", title='" + title + "', description='" + description + "', completed=" + completed + "}";
    }

}
