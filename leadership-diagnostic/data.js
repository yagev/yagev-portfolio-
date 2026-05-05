const diagnosticData = {
  "assessment": {
    "title": "Imperfectly Great Leadership Diagnostic",
    "description": "A self-assessment focused on real leadership behavior under pressure, not idealized leadership traits.",
    "scale": {
      "min": 1,
      "max": 5,
      "labels": {
        "1": "Almost Never",
        "2": "Rarely",
        "3": "Sometimes",
        "4": "Often",
        "5": "Almost Always"
      }
    },
    "dimensions": [
      {
        "id": "C1",
        "name": "Self-Awareness & Mindset",
        "questions": [
          {"id": "Q1", "text": "I can clearly articulate my key leadership limitations and how they affect my effectiveness.", "reverse_scored": false},
          {"id": "Q2", "text": "When my initial approach is challenged by results, I re-evaluate it rather than reinforcing it.", "reverse_scored": false},
          {"id": "Q3", "text": "I recognize patterns in how I behave under pressure (e.g., increased control, avoidance, over-involvement).", "reverse_scored": false},
          {"id": "Q4", "text": "I actively question assumptions that previously worked or led to success.", "reverse_scored": false},
          {"id": "Q5", "text": "I can distinguish between situations that require excellence and those where “good enough” is sufficient.", "reverse_scored": false},
          {"id": "Q6", "text": "I tend to justify my behavior instead of examining it critically.", "reverse_scored": true}
        ]
      },
      {
        "id": "C2",
        "name": "Relationships",
        "questions": [
          {"id": "Q7", "text": "I invest time in getting to know people beyond their role.", "reverse_scored": false},
          {"id": "Q8", "text": "When under time pressure, I tend to deprioritize relationship-building.", "reverse_scored": true},
          {"id": "Q9", "text": "I adapt my communication style to different individuals and contexts.", "reverse_scored": false},
          {"id": "Q10", "text": "I sometimes assume I understand what motivates my team without checking.", "reverse_scored": true},
          {"id": "Q11", "text": "I create moments where people feel seen—even if nothing “productive” happens.", "reverse_scored": false},
          {"id": "Q12", "text": "I avoid deeper personal conversations with team members because they feel inefficient.", "reverse_scored": true}
        ]
      },
      {
        "id": "C3",
        "name": "Team Leadership",
        "questions": [
          {"id": "Q13", "text": "I define success clearly enough that others can act independently.", "reverse_scored": false},
          {"id": "Q14", "text": "I step in quickly when results are not meeting expectations.", "reverse_scored": true},
          {"id": "Q15", "text": "I address performance issues and conflicts early, even when uncomfortable.", "reverse_scored": false},
          {"id": "Q16", "text": "I rely more on my own standards than on shared team agreements.", "reverse_scored": true},
          {"id": "Q17", "text": "I develop people through questions and coaching rather than providing solutions.", "reverse_scored": false},
          {"id": "Q18", "text": "I feel the need to stay closely involved to ensure quality outcomes.", "reverse_scored": true}
        ]
      },
      {
        "id": "C4",
        "name": "Resilience",
        "questions": [
          {"id": "Q19", "text": "I remain effective when priorities shift rapidly or ambiguity increases.", "reverse_scored": false},
          {"id": "Q20", "text": "In uncertain situations, I increase control rather than provide clarity.", "reverse_scored": true},
          {"id": "Q21", "text": "I recover quickly from setbacks without carrying frustration into future interactions.", "reverse_scored": false},
          {"id": "Q22", "text": "I unintentionally pass pressure or stress onto my team.", "reverse_scored": true},
          {"id": "Q23", "text": "I use structured practices (e.g., debriefs, retrospectives) to learn from experience.", "reverse_scored": false}
        ]
      },
      {
        "id": "C5",
        "name": "Strategy & Influence",
        "questions": [
          {"id": "Q24", "text": "I connect my team’s work to broader organizational and market context.", "reverse_scored": false},
          {"id": "Q25", "text": "I tend to avoid organizational politics rather than navigate them.", "reverse_scored": true},
          {"id": "Q26", "text": "I actively identify and manage key stakeholders who influence outcomes.", "reverse_scored": false},
          {"id": "Q27", "text": "I assume that strong performance alone will ensure visibility and influence.", "reverse_scored": true},
          {"id": "Q28", "text": "I tend to focus more on execution than on strategy.", "reverse_scored": true}
        ]
      },
      {
        "id": "C6",
        "name": "Change & Adaptability",
        "questions": [
          {"id": "Q29", "text": "I act quickly to reassess priorities when new information emerges.", "reverse_scored": false},
          {"id": "Q30", "text": "I delay action until I feel confident in the full plan.", "reverse_scored": true},
          {"id": "Q31", "text": "I encourage rapid experimentation and learning, even at the cost of short-term efficiency.", "reverse_scored": false},
          {"id": "Q32", "text": "I find it difficult to abandon initiatives I have already invested in.", "reverse_scored": true},
          {"id": "Q33", "text": "I regularly ask: “What has changed, and what does it require from us?”", "reverse_scored": false},
          {"id": "Q34", "text": "I prefer stability and clear plans over adapting to constant change.", "reverse_scored": true}
        ]
      },
      {
        "id": "C7",
        "name": "Collaboration & Ego",
        "questions": [
          {"id": "Q35", "text": "I actively seek input, even when I believe I already know the answer.", "reverse_scored": false},
          {"id": "Q36", "text": "I become impatient when some team members slow down decision making.", "reverse_scored": true},
          {"id": "Q37", "text": "I work effectively with peers whose styles or priorities differ from mine.", "reverse_scored": false},
          {"id": "Q38", "text": "I tend to dismiss ideas when they come from less experienced people.", "reverse_scored": true},
          {"id": "Q39", "text": "I create space for constructive disagreement within my team.", "reverse_scored": false},
          {"id": "Q40", "text": "I equate being right with being effective.", "reverse_scored": true}
        ]
      }
    ]
  }
};
