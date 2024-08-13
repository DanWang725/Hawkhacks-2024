def getAIMockResponse():
    return {
        "questions": [
            {
                "question": "Which conscription law provides the highest recruitable population modifier?",
                "options": ["Limited Conscription", "Service by Requirement", "All Adults Serve", "Scraping the Barrel"],
                "answer": 3,
                "explanation": "Scraping the Barrel provides the highest recruitable population modifier at 25%, higher than all other conscription laws."
            },
            {
                "question": "What is the recruitable population factor for the USA during the Great Depression?",
                "options": ["-50%", "0%", "10%", "20%"],
                "answer": 0,
                "explanation": "The USA has a recruitable population factor of -50% due to the Great Depression, significantly reducing its effective recruitable population."
            },
            {
                "question": "Which conscription law requires more than 70% war support to be enacted?",
                "options": ["Limited Conscription", "Extensive Conscription", "Service by Requirement", "All Adults Serve"],
                "answer": 3,
                "explanation": "All Adults Serve requires more than 70% war support, along with other conditions, to be enacted."
            },
            {
                "question": "Which national spirit provides a 10% recruitable population factor for Australia?",
                "options": ["Australian Women's Army Service", "Agrarian Society", "Militarized Schools", "Send in the Zombies"],
                "answer": 0,
                "explanation": "Australian Women's Army Service provides a 10% recruitable population factor, boosting Australia's available manpower."
            },
            {
                "question": "What is the base penalty for non-core states' manpower?",
                "options": ["-50%", "-80%", "-90%", "-98%"],
                "answer": 3,
                "explanation": "Non-core states have a base penalty of -98%, meaning they contribute very little manpower compared to core states."
            },
            {
                "question": "Which land doctrine provides a 5% recruitable population modifier?",
                "options": ["Volkssturm", "Non-Discriminatory Conscription", "Human Wave Offensive", "Total Mobilization"],
                "answer": 2,
                "explanation": "Human Wave Offensive, part of the Mass Assault Doctrine, provides a 5% recruitable population modifier."
            },
            {
                "question": "Which conscription law has no prerequisites and provides a 1.5% recruitable population modifier?",
                "options": ["Volunteer Only", "Limited Conscription", "Extensive Conscription", "Service by Requirement"],
                "answer": 0,
                "explanation": "Volunteer Only requires no specific prerequisites and provides a 1.5% recruitable population modifier."
            },
            {
                "question": "How is the recruitable population affected under Total Mobilization?",
                "options": ["Increases by 5%", "Decreases by 3%", "Remains the same", "Increases by 3%"],
                "answer": 1,
                "explanation": "Under Total Mobilization, the recruitable population decreases by 3%, due to the higher demands on the civilian workforce."
            }
        ]
    }