export const translations = {
  "en": {
    "app": {
      "title": "Skin Analyzer",
      "subtitle": "Intelligent skin tone analysis"
    },
    "upload": {
      "title": "Upload a photo of your face",
      "subtitle": "Drag and drop here or choose an option below",
      "chooseFile": "Choose file",
      "useCamera": "Use camera",
      "hint": "JPG, PNG, or WebP - max 10MB",
      "errorFormat": "Invalid format. Use JPG, PNG, or WebP.",
      "errorSize": "File too large. Maximum size: 10MB.",
      "or": "or",
      "privacyNotice": "Your photo is processed for this analysis only and is not shared."
    },
    "preview": {
      "title": "Ready to analyze?",
      "checklist": [
        "Face well-lit and centered in the frame",
        "No glasses or accessories covering the face",
        "Neutral expression, looking straight ahead",
        "Makeup removed for best results"
      ],
      "analyze": "Analyze skin",
      "changePhoto": "Change photo",
      "consentLabel": "I consent to my photo being processed for skin analysis.",
      "consentRequired": "Please accept the privacy consent to continue."
    },
    "loading": "Analyzing your skin...",
    "errors": {
      "tooLarge": "Image too large. Please use an image smaller than 10MB.",
      "invalidFormat": "Invalid format. Please use JPG, PNG, or WebP.",
      "tooSmall": "Image too small. Please use an image at least 300x300px.",
      "tooDark": "Image too dark. Please improve the lighting and try again.",
      "tooBright": "Image too bright or overexposed. Please try softer lighting.",
      "noFace": "Could not detect a face in the image. Please center your face and try again.",
      "generic": "Error analyzing the image. Check your connection and try again.",
      "tryAgain": "Try again"
    },
    "result": {
      "undertoneLabel": "Predominant undertone",
      "byRegion": "Analysis by region",
      "uniformity": "Uniformity",
      "noImperfections": "No imperfections detected",
      "imperfectionsTitle": "Detected imperfections",
      "toneComparison": "Tone comparison by region",
      "newAnalysis": "New analysis",
      "foundationTitle": "Foundation Matches",
      "foundationSubtitle": "Shades selected for your skin tone and undertone",
      "findIt": "Find it",
      "vs": "vs",
      "matchScore": "Match score",
      "skinTone": "Detected skin tone",
      "skinPalette": "Your Skin Palette",
      "healthySkinTone": "Healthy Skin Tone",
      "uniformityMap": "Skin Uniformity Map",
      "conditionsTitle": "Condition indicators",
      "conditionsSubtitle": "Detected segmentation indicators by facial region. This is not a medical diagnosis."
    },
    "notes": {
      "Area with oily tendency and visible pores": "Area with oily tendency and visible pores",
      "Even tone with a small sun spot": "Even tone with a small sun spot",
      "Well-balanced and uniform region": "Well-balanced and uniform region",
      "T-zone with high oiliness and visible blackheads": "T-zone with high oiliness and visible blackheads",
      "Mild acne in the chin area": "Mild acne in the chin area",
      "Analysis unavailable for this region.": "Analysis unavailable for this region."
    },
    "medicalAlert": {
      "title": "Not a medical diagnosis",
      "message": "Lumière provides cosmetic guidance and educational prototype analysis only. It does not diagnose, treat, or replace advice from a licensed healthcare professional.",
      "recommendation": "If you notice persistent, painful, changing, spreading, bleeding, or concerning skin changes, please consult a licensed healthcare professional."
    },
    "recommendationsBlocked": {
      "title": "Recommendations paused",
      "message": "Makeup recommendations are paused because this result may require medical review first."
    },
    "recommendations": {
      "banner": {
        "spfWarning": "Based on your detected condition, we recommend using SPF 30+ sunscreen daily to help prevent further pigmentation."
      },
      "badge": {
        "dermatologicallyTested": "Tested"
      },
      "step": {
        "colorCorrectorTitle": "Step 1: Color correction",
        "colorCorrectorDesc": "Apply a color corrector before foundation to neutralize hyperpigmentation or redness."
      }
    },
    "gdprConsent": {
      "title": "Lumière Facial Photo Processing and Skin Analysis Terms of Service",
      "body": "I. Photo Processing and Purpose Limitation\n\n1. Real-time Analysis: When you use the skin analysis feature of Lumière (including the mobile application and web portal), the system requires you to provide or take a clear photo of your face.\n2. One-time Use: The photo is used on the server solely for generating your real-time cosmetic recommendations and skin analysis results. Lumière promises that once the analysis process ends, your original photo file will not be used for any other purposes, nor will it be shared with any third party.\n\nII. Analysis Results and Data Storage\n\n1. Report Retention: To help you track your skin conditions and retrieve them later, Lumière will store the generated data metrics and text reports (excluding the original photo file) in your personal account.\n2. Data Autonomy: You may delete your historical analysis records at any time through your account settings.\n\nIII. Non-Medical Disclaimer\n\n1. Not a Medical Diagnosis: The skin analysis results, skin age, skin classification, and cosmetic recommendations generated by Lumière's AI technology are purely for beauty and skincare guidance. They do not constitute, nor do they replace, any professional medical diagnosis, care, prevention, or treatment.\n2. Professional Consultation: None of the information provided by Lumière should be treated as a medical prescription. If your skin exhibits redness, swelling, inflammation, lesions, or other discomforts, you should immediately seek assistance from a qualified dermatologist or medical team. Lumière does not assume any legal liability resulting from treating this service as medical advice.\n\nIV. Process Termination and Authorization\n\n1. Voluntary Termination: Before checking consent and clicking the \"Analyze skin\" button, you can freely exit, close the window, or return to the previous page to stop the analysis process. Under this circumstance, Lumière will not upload, process, or transmit your photo.\n2. Formal Authorization: Once you check consent and click the \"Analyze skin\" button to submit your photo, it indicates that you fully understand and formally agree to authorize Lumière to process your facial photo for this skin analysis.",
      "checkbox": "I have read and agree to the processing of my photo for skin analysis.",
      "retention": "",
      "withdrawal": ""
    },
    "fitzpatrick": {
      "1": "Type I - Very fair skin, always burns, never tans",
      "2": "Type II - Fair skin, usually burns, rarely tans",
      "3": "Type III - Medium skin, sometimes burns, gradually tans",
      "4": "Type IV - Olive skin, rarely burns, tans easily",
      "5": "Type V - Dark brown skin, very rarely burns",
      "6": "Type VI - Deeply pigmented skin, never burns",
      "unknown": "Unknown skin type"
    },
    "undertones": {
      "quente": "Warm (golden, peachy, yellowish)",
      "frio": "Cool (rosy, reddish, bluish)",
      "neutro": "Neutral (balance of warm and cool)"
    },
    "undertoneShort": {
      "quente": "Warm",
      "frio": "Cool",
      "neutro": "Neutral"
    },
    "oiliness": {
      "seco": "Dry",
      "seca": "Dry",
      "normal": "Normal",
      "misto": "Combination",
      "mista": "Combination",
      "oleoso": "Oily",
      "alta": "Oily",
      "muito_alta": "Very oily"
    },
    "imperfections": {
      "poro_dilatado": "Enlarged pores",
      "brilho_excessivo": "Excess shine",
      "mancha_solar": "Sun spot",
      "cravos": "Blackheads",
      "acne_leve": "Mild acne",
      "acne_moderada": "Moderate acne",
      "acne_severa": "Severe acne",
      "olheira": "Dark circles",
      "rugas": "Wrinkles",
      "hiperpigmentacao": "Hyperpigmentation",
      "acne": "Acne",
      "mancha": "Spot",
      "poro": "Pores",
      "linha": "Fine lines",
      "vermelhidao": "Redness",
      "outro": "Other"
    },
    "conditions": {
      "vitiligo": "Vitiligo",
      "melasma": "Melasma",
      "wine_stain": "Port-wine stain",
      "forehead_wrinkle": "Forehead wrinkle",
      "crow_s_feet": "Crow's feet",
      "nasolabial_fold": "Nasolabial fold"
    },
    "intensity": {
      "leve": "Mild",
      "moderada": "Moderate",
      "moderado": "Moderate",
      "alta": "High",
      "intenso": "Intense"
    },
    "regions": {
      "testa": "Forehead",
      "bochecha_e": "Left cheek",
      "bochecha_d": "Right cheek",
      "nariz": "Nose",
      "queixo": "Chin"
    },
    "comparison": {
      "baixo": "Low",
      "moderado": "Moderate",
      "alto": "High"
    },
    "camera": {
      "title": "Take a photo",
      "close": "Close camera",
      "capture": "Capture photo",
      "permissionDenied": "Camera permission denied. Check your browser settings.",
      "notFound": "No camera found on this device.",
      "error": "Could not access the camera. Please try again."
    },
    "landing": {
      "eyebrow": "AI-powered cosmetic guidance",
      "title": "Understand your skin tone before choosing your makeup.",
      "description": "Lumière analyzes facial regions, estimates skin tone, highlights visible skin indicators, and recommends makeup products using a privacy-conscious academic prototype workflow.",
      "step1": "Upload or capture a face photo.",
      "step2": "Review tone, region, and condition indicators.",
      "step3": "Get cosmetic recommendations with clear limitations.",
      "nonDiagnostic": "Non-diagnostic",
      "privacyNotice": "Photo processed for analysis only",
      "educationalUse": "Built for educational prototype use",
      "welcomeBack": "Welcome back",
      "signInSubtitle": "Sign in to continue, or use guest mode for a quick analysis.",
      "emailLabel": "Email",
      "passwordLabel": "Password",
      "signInBtn": "Sign in",
      "guestBtn": "Continue as guest",
      "signUpBtn": "Sign up",
      "createAccount": "Create your account",
      "signUpSubtitle": "Create an account to start your skin analysis.",
      "usernameLabel": "Username",
      "confirmPasswordLabel": "Confirm password",
      "passwordMismatch": "Passwords do not match.",
      "passwordHint": "Passwords must contain at least 8 characters, including a letter and a number.",
      "submitting": "Please wait…",
      "logoutBtn": "Log out"
    }
  },
  "pt": {
    "app": {
      "title": "Analisador de Pele",
      "subtitle": "Análise inteligente do tom de pele"
    },
    "upload": {
      "title": "Envie uma foto do seu rosto",
      "subtitle": "Arraste e solte aqui ou escolha uma opção abaixo",
      "chooseFile": "Escolher arquivo",
      "useCamera": "Usar câmera",
      "hint": "JPG, PNG ou WebP - máximo 10MB",
      "errorFormat": "Formato inválido. Use JPG, PNG ou WebP.",
      "errorSize": "Arquivo muito grande. Tamanho máximo: 10MB.",
      "or": "ou",
      "privacyNotice": "A sua foto é processada apenas para esta análise e não é compartilhada."
    },
    "preview": {
      "title": "Pronto para analisar?",
      "checklist": [
        "Rosto bem iluminado e centralizado",
        "Sem óculos ou acessórios cobrindo o rosto",
        "Expressão neutra, olhando para frente",
        "Sem maquiagem para melhores resultados"
      ],
      "analyze": "Analisar pele",
      "changePhoto": "Trocar foto",
      "consentLabel": "Aceito que a minha foto seja processada para análise de pele.",
      "consentRequired": "Por favor, aceite o consentimento de privacidade para continuar."
    },
    "loading": "Analisando a sua pele...",
    "errors": {
      "tooLarge": "Imagem muito grande. Use uma imagem menor que 10MB.",
      "invalidFormat": "Formato inválido. Use JPG, PNG ou WebP.",
      "tooSmall": "Imagem muito pequena. Use uma imagem de pelo menos 300x300px.",
      "tooDark": "Imagem muito escura. Melhore a iluminação e tente novamente.",
      "tooBright": "Imagem muito clara ou superexposta. Tente uma iluminação mais suave.",
      "noFace": "Não foi possível detectar um rosto. Centralize o rosto e tente novamente.",
      "generic": "Erro ao analisar a imagem. Verifique a conexão e tente novamente.",
      "tryAgain": "Tentar novamente"
    },
    "result": {
      "undertoneLabel": "Subtom predominante",
      "byRegion": "Análise por região",
      "uniformity": "Uniformidade",
      "noImperfections": "Nenhuma imperfeição detectada",
      "imperfectionsTitle": "Imperfeições detectadas",
      "toneComparison": "Comparação de tons por região",
      "newAnalysis": "Nova análise",
      "foundationTitle": "Bases recomendadas",
      "foundationSubtitle": "Tons selecionados para o seu tom de pele e subtom",
      "findIt": "Encontrar",
      "vs": "vs",
      "matchScore": "Pontuação de compatibilidade",
      "skinTone": "Tom de pele detectado",
      "skinPalette": "Sua Paleta de Pele",
      "healthySkinTone": "Tom de Pele Saudável",
      "uniformityMap": "Mapa de Uniformidade da Pele",
      "conditionsTitle": "Indicadores de condições detectadas",
      "conditionsSubtitle": "Indicadores de segmentação por região facial. Isto não é um diagnóstico médico."
    },
    "notes": {
      "Area with oily tendency and visible pores": "Área com tendência oleosa e poros visíveis",
      "Even tone with a small sun spot": "Tom uniforme com uma pequena mancha solar",
      "Well-balanced and uniform region": "Região bem equilibrada e uniforme",
      "T-zone with high oiliness and visible blackheads": "Zona T com alta oleosidade e cravos visíveis",
      "Mild acne in the chin area": "Acne leve na área do queixo",
      "Analysis unavailable for this region.": "Análise indisponível para esta região."
    },
    "medicalAlert": {
      "title": "Não é um diagnóstico médico",
      "message": "A Lumière fornece apenas orientação cosmética e análise educativa de protótipo. Ela não diagnostica, não trata e não substitui o aconselhamento de um profissional de saúde licenciado.",
      "recommendation": "Se notar alterações persistentes, dolorosas, em mudança, espalhando-se, sangrando ou preocupantes na pele, consulte um profissional de saúde licenciado."
    },
    "recommendationsBlocked": {
      "title": "Recomendações pausadas",
      "message": "As recomendações de maquiagem foram pausadas porque este resultado pode exigir primeiro uma avaliação médica."
    },
    "recommendations": {
      "banner": {
        "spfWarning": "Com base na condição detectada, recomendamos o uso diário de protetor solar FPS 30+ para ajudar a prevenir mais pigmentação."
      },
      "badge": {
        "dermatologicallyTested": "Testado"
      },
      "step": {
        "colorCorrectorTitle": "Passo 1: Correção de cor",
        "colorCorrectorDesc": "Aplique um corretor de cor antes da base para neutralizar hiperpigmentação ou vermelhidão."
      }
    },
    "gdprConsent": {
      "title": "Termos de Serviço de Processamento de Fotos Faciais e Análise de Pele da Lumière",
      "body": "I. Processamento de Fotos e Limitação de Finalidade\n\n1. Análise em Tempo Real: Quando utiliza a função de análise de pele da Lumière (incluindo a aplicação móvel e a versão web), o sistema necessita que forneça ou tire uma fotografia facial nítida.\n2. Utilização Única: A fotografia será utilizada no servidor apenas para gerar de imediato as recomendações de cosméticos e os resultados de análise de pele desta sessão. A Lumière compromete-se a não utilizar o ficheiro da fotografia original para outros fins após a conclusão do processo de análise, nem a partilhá-lo com terceiros.\n\nII. Resultados de Análise e Armazenamento de Dados\n\n1. Retenção de Relatórios: Para facilitar o acompanhamento da sua condição de pele e consultas futuras, a Lumière guardará os resultados de dados e os relatórios de texto (excluindo o ficheiro da fotografia original) na sua conta pessoal.\n2. Autonomia de Dados: Pode eliminar o seu histórico de análises a qualquer momento através das definições da sua conta.\n\nIII. Isenção de Responsabilidade Não Médica\n\n1. Sem Diagnóstico Médico: Os resultados de análise de pele, a idade da pele, a classificação do tipo de pele e as recomendações de cosméticos geradas pela tecnologia de IA da Lumière são meramente sugestões de beleza e cuidados de pele. Não constituem nem substituem qualquer diagnóstico, cuidado, prevenção ou tratamento médico profissional.\n2. Consulta Profissional: Nenhuma informação fornecida pela Lumière deve ser tratada como receita médica. Caso a sua pele apresente vermelhidão, inchaço, inflamação, lesões ou outros sintomas de desconforto, deve procurar assistência imediata de um dermatologista ou equipa médica qualificada. A Lumière não assume qualquer responsabilidade legal decorrente do tratamento deste serviço como aconselhamento médico.\n\nIV. Cancelamento do Processo e Autorização Formal\n\n1. Cancelamento Voluntário: Antes de assinalar o consentimento e clicar no botão \"Analisar pele\", pode sair livremente, fechar a janela ou voltar à página anterior para interromper o processo de análise. Nesses casos, a Lumière não fará qualquer carregamento, processamento ou transmissão da sua fotografia.\n2. Autorização Formal: Ao assinalar o consentimento e clicar no botão \"Analisar pele\" para submeter a fotografia, declara que compreende totalmente e autoriza formalmente a Lumière a processar a sua fotografia facial para realizar esta análise de pele.",
      "checkbox": "Li e concordo com o processamento da minha foto para análise de pele.",
      "retention": "",
      "withdrawal": ""
    },
    "fitzpatrick": {
      "1": "Tipo I - Pele muito clara, sempre queima, nunca bronzeia",
      "2": "Tipo II - Pele clara, geralmente queima, raramente bronzeia",
      "3": "Tipo III - Pele média, às vezes queima, bronzeia gradualmente",
      "4": "Tipo IV - Pele morena/oliva, raramente queima, bronzeia facilmente",
      "5": "Tipo V - Pele castanha escura, muito raramente queima",
      "6": "Tipo VI - Pele profundamente pigmentada, nunca queima",
      "unknown": "Tipo de pele desconhecido"
    },
    "undertones": {
      "quente": "Quente (dourado, pêssego, amarelado)",
      "frio": "Frio (rosado, avermelhado, azulado)",
      "neutro": "Neutro (equilíbrio entre quente e frio)"
    },
    "undertoneShort": {
      "quente": "Quente",
      "frio": "Frio",
      "neutro": "Neutro"
    },
    "oiliness": {
      "seco": "Seca",
      "seca": "Seca",
      "normal": "Normal",
      "misto": "Mista",
      "mista": "Mista",
      "oleoso": "Oleosa",
      "alta": "Oleosa",
      "muito_alta": "Muito oleosa"
    },
    "imperfections": {
      "poro_dilatado": "Poros dilatados",
      "brilho_excessivo": "Brilho excessivo",
      "mancha_solar": "Mancha solar",
      "cravos": "Cravos",
      "acne_leve": "Acne leve",
      "acne_moderada": "Acne modera",
      "acne_severa": "Acne severa",
      "olheira": "Olheiras",
      "rugas": "Rugas",
      "hiperpigmentacao": "Hiperpigmentação",
      "acne": "Acne",
      "mancha": "Mancha",
      "poro": "Poros",
      "linha": "Linhas finas",
      "vermelhidao": "Vermelhidão",
      "outro": "Outro"
    },
    "conditions": {
      "vitiligo": "Vitiligo",
      "melasma": "Melasma",
      "wine_stain": "Mancha em vinho do Porto",
      "forehead_wrinkle": "Rugas na testa",
      "crow_s_feet": "Pés de galinha",
      "nasolabial_fold": "Bigode chinês"
    },
    "intensity": {
      "leve": "Leve",
      "moderada": "Moderada",
      "moderado": "Moderado",
      "alta": "Alta",
      "intenso": "Intenso"
    },
    "regions": {
      "testa": "Testa",
      "bochecha_e": "Bochecha esquerda",
      "bochecha_d": "Bochecha direita",
      "nariz": "Nariz",
      "queixo": "Queixo"
    },
    "comparison": {
      "baixo": "Baixo",
      "moderado": "Moderado",
      "alto": "Alto"
    },
    "camera": {
      "title": "Tirar uma foto",
      "close": "Fechar câmera",
      "capture": "Capturar foto",
      "permissionDenied": "Permissão de câmera negada. Verifique as configurações do navegador.",
      "notFound": "Nenhuma câmera encontrada neste dispositivo.",
      "error": "Não foi possível acessar a câmera. Tente novamente."
    },
    "landing": {
      "eyebrow": "Orientação cosmética por IA",
      "title": "Entenda o seu tom de pele antes de escolher a maquilhagem.",
      "description": "Lumière analisa as regiões faciais, estima o tom da pele, destaca indicadores visíveis e recomenda produtos cosméticos usando um protótipo académico centrado na privacidade.",
      "step1": "Envie ou tire uma foto do rosto.",
      "step2": "Reveja os indicadores de tom, região e condições da pele.",
      "step3": "Obtenha recomendações cosméticas com limitações claras.",
      "nonDiagnostic": "Não diagnóstico",
      "privacyNotice": "Foto processada apenas para análise",
      "educationalUse": "Desenvolvido para fins de protótipo educacional",
      "welcomeBack": "Bem-vindo de volta",
      "signInSubtitle": "Inicie sessão para continuar, ou utilize o modo de convidado para uma análise rápida.",
      "emailLabel": "E-mail",
      "passwordLabel": "Palavra-passe",
      "signInBtn": "Iniciar sessão",
      "guestBtn": "Continuar como convidado",
      "signUpBtn": "Criar conta",
      "createAccount": "Crie a sua conta",
      "signUpSubtitle": "Crie uma conta para iniciar a sua análise da pele.",
      "usernameLabel": "Nome de utilizador",
      "confirmPasswordLabel": "Confirmar palavra-passe",
      "passwordMismatch": "As palavras-passe não coincidem.",
      "passwordHint": "A palavra-passe deve ter pelo menos 8 caracteres, incluindo uma letra e um número.",
      "submitting": "Aguarde…",
      "logoutBtn": "Terminar sessão"
    }
  },
  "fr": {
    "app": {
      "title": "Analyseur de Peau",
      "subtitle": "Analyse intelligente du teint"
    },
    "upload": {
      "title": "Téléchargez une photo de votre visage",
      "subtitle": "Glissez-déposez ici ou choisissez une option ci-dessous",
      "chooseFile": "Choisir un fichier",
      "useCamera": "Utiliser la caméra",
      "hint": "JPG, PNG ou WebP - maximum 10 Mo",
      "errorFormat": "Format invalide. Utilisez JPG, PNG ou WebP.",
      "errorSize": "Fichier trop volumineux. Taille maximale : 10 Mo.",
      "or": "ou",
      "privacyNotice": "Votre photo est traitée uniquement pour cette analyse et n'est pas partagée."
    },
    "preview": {
      "title": "Prêt à analyser ?",
      "checklist": [
        "Visage bien éclairé et centré dans le cadre",
        "Pas de lunettes ou d'accessoires couvrant le visage",
        "Expression neutre, regard droit devant",
        "Sans maquillage pour de meilleurs résultats"
      ],
      "analyze": "Analyser la peau",
      "changePhoto": "Changer la photo",
      "consentLabel": "J'accepte que ma photo soit traitée pour l'analyse de peau.",
      "consentRequired": "Veuillez accepter le consentement de confidentialité pour continuer."
    },
    "loading": "Analyse de votre peau en cours...",
    "errors": {
      "tooLarge": "Image trop volumineuse. Utilisez une image de moins de 10 Mo.",
      "invalidFormat": "Format invalide. Utilisez JPG, PNG ou WebP.",
      "tooSmall": "Image trop petite. Utilisez une image d'au moins 300x300 px.",
      "tooDark": "Image trop sombre. Améliorez l'éclairage et réessayez.",
      "tooBright": "Image trop claire ou surexposée. Essayez une lumière plus douce.",
      "noFace": "Impossible de détecter un visage. Centrez votre visage et réessayez.",
      "generic": "Erreur lors de l'analyse. Vérifiez votre connexion et réessayez.",
      "tryAgain": "Réessayer"
    },
    "result": {
      "undertoneLabel": "Sous-ton dominant",
      "byRegion": "Analyse par région",
      "uniformity": "Uniformité",
      "noImperfections": "Aucune imperfection détectée",
      "imperfectionsTitle": "Imperfections détectées",
      "toneComparison": "Comparaison des tons par région",
      "newAnalysis": "Nouvelle analyse",
      "foundationTitle": "Fonds de teint recommandés",
      "foundationSubtitle": "Teintes sélectionnées pour votre carnation et votre sous-ton",
      "findIt": "Voir le produit",
      "vs": "vs",
      "matchScore": "Score de correspondance",
      "skinTone": "Teint détecté",
      "skinPalette": "Votre Palette de Peau",
      "healthySkinTone": "Teint de Peau Sain",
      "uniformityMap": "Carte d'Uniformité de la Peau",
      "conditionsTitle": "Indicateurs de conditions détectées",
      "conditionsSubtitle": "Indicateurs de segmentation par région du visage. Ceci n’est pas un diagnostic médical."
    },
    "notes": {
      "Area with oily tendency and visible pores": "Zone à tendance grasse avec pores visibles",
      "Even tone with a small sun spot": "Teint uniforme avec une petite tache solaire",
      "Well-balanced and uniform region": "Région équilibrée et uniforme",
      "T-zone with high oiliness and visible blackheads": "Zone T avec excès de sébum et points noirs visibles",
      "Mild acne in the chin area": "Acné légère au niveau du menton",
      "Analysis unavailable for this region.": "Analyse non disponible pour cette région."
    },
    "medicalAlert": {
      "title": "Pas un diagnostic médical",
      "message": "Lumière fournit uniquement des conseils cosmétiques et une analyse éducative de prototype. Elle ne diagnostique pas, ne traite pas et ne remplace pas les conseils d'un professionnel de santé agréé.",
      "recommendation": "Si vous remarquez des changements cutanés persistants, douloureux, évolutifs, qui s'étendent, saignent ou vous inquiètent, consultez un professionnel de santé agréé."
    },
    "recommendationsBlocked": {
      "title": "Recommandations suspendues",
      "message": "Les recommandations de maquillage sont suspendues car ce résultat peut nécessiter d'abord un avis médical."
    },
    "recommendations": {
      "banner": {
        "spfWarning": "D'après l'état détecté, nous recommandons l'utilisation quotidienne d'un écran solaire SPF 30+ pour aider à prévenir une pigmentation supplémentaire."
      },
      "badge": {
        "dermatologicallyTested": "Testé"
      },
      "step": {
        "colorCorrectorTitle": "Étape 1 : Correction de couleur",
        "colorCorrectorDesc": "Appliquez un correcteur de couleur avant le fond de teint afin de neutraliser l'hyperpigmentation ou les rougeurs."
      }
    },
    "gdprConsent": {
      "title": "Conditions d'utilisation du traitement des photos de visage et de l'analyse de la peau Lumière",
      "body": "I. Traitement des photos et limitation des finalités\n\n1. Analyse en temps réel : Lorsque vous utilisez la fonction d'analyse de la peau de Lumière (y compris l'application mobile et le portail web), le système nécessite que vous fournissiez ou preniez une photo claire de votre visage.\n2. Utilisation unique : La photo est traitée sur le serveur uniquement pour générer en temps réel les recommandations cosmétiques et les résultats d'analyse de la peau de cette session. Lumière s'engage à ne pas utiliser le fichier de votre photo originale à d'autres fins une fois le processus d'analyse terminé, et à ne pas le partager avec des tiers.\n\nII. Résultats d'analyse et stockage des données\n\n1. Conservation des rapports : Afin de vous aider à suivre l'évolution de votre peau et à consulter vos données ultérieurement, Lumière enregistre les données de résultats et les rapports textuels générés (à l'exclusion du fichier de la photo originale) sur votre compte personnel.\n2. Autonomie des données : Vous pouvez supprimer votre historique d'analyse à tout moment via les paramètres de votre compte.\n\nIII. Clause de non-responsabilité médicale\n\n1. Pas de diagnostic médical : Les résultats de l'analyse de la peau, l'âge de la peau, la classification cutanée et les recommandations cosmétiques générés par la technologie IA de Lumière sont purement destinés à des conseils de beauté et de soins de la peau. Ils ne constituent pas et ne remplacent pas un diagnostic, des soins, une prévention ou un traitement médical professionnel.\n2. Consultation professionnelle : Aucune information fournie par Lumière ne doit être considérée comme une prescription médicale. Si votre peau présente des rougeurs, des gonflements, des inflammations, des lésions ou tout acun inconfort, vous devez immédiatement consulter un dermatologue ou une équipe médicale qualifiée. Lumière décline toute responsabilité légale découlant de l'assimilation de ce service à des conseils médicaux.\n\nIV. Interruption du processus et autorisation formelle\n\n1. Interruption volontaire : Avant de cocher le consentement et de cliquer sur le bouton « Analyser la peau », vous pouvez à tout moment quitter le service, fermer la fenêtre ou revenir à la page précédente pour arrêter le processus d'analyse. Dans ce cas, Lumière ne procédera à aucun téléchargement, traitement ou transfert de votre photo.\n2. Autorisation formelle : Une fois que vous cochez le consentement et cliquez sur le bouton « Analyser la peau » pour soumettre votre photo, cela indique que vous comprenez pleinement et acceptez formellement d'autoriser Lumière à traiter votre photo de visage pour cette analyse de la peau.",
      "checkbox": "J'ai lu et j'accepte le traitement de ma photo pour l'analyse de peau.",
      "retention": "",
      "withdrawal": ""
    },
    "fitzpatrick": {
      "1": "Type I - Peau très claire, brûle toujours, ne bronze jamais",
      "2": "Type II - Peau claire, brûle souvent, bronze rarement",
      "3": "Type III - Peau moyenne, brûle parfois, bronze progressivement",
      "4": "Type IV - Peau mate/olive, brûle rarement, bronze facilement",
      "5": "Type V - Peau brun foncé, brûle très rarement",
      "6": "Type VI - Peau très pigmentée, ne brûle jamais",
      "unknown": "Type de peau inconnu"
    },
    "undertones": {
      "quente": "Chaud (doré, pêche, jaunâtre)",
      "frio": "Froid (rosé, rougeâtre, bleuté)",
      "neutro": "Neutre (équilibre entre chaud et froid)"
    },
    "undertoneShort": {
      "quente": "Chaud",
      "frio": "Froid",
      "neutro": "Neutre"
    },
    "oiliness": {
      "seco": "Sèche",
      "seca": "Sèche",
      "normal": "Normale",
      "misto": "Mixte",
      "mista": "Mixte",
      "oleoso": "Grasse",
      "alta": "Grasse",
      "muito_alta": "Très grasse"
    },
    "imperfections": {
      "poro_dilatado": "Pores dilatés",
      "brilho_excessivo": "Brillance excessive",
      "mancha_solar": "Tache solaire",
      "cravos": "Points noirs",
      "acne_leve": "Acné légère",
      "acne_moderada": "Acné modérée",
      "acne_severa": "Acné sévère",
      "olheira": "Cernes",
      "rugas": "Rides",
      "hiperpigmentacao": "Hyperpigmentation",
      "acne": "Acné",
      "mancha": "Tache",
      "poro": "Pores",
      "linha": "Ridules",
      "vermelhidao": "Rougeur",
      "outro": "Autre"
    },
    "conditions": {
      "vitiligo": "Vitiligo",
      "melasma": "Mélasme",
      "wine_stain": "Tache de vin",
      "forehead_wrinkle": "Rides du front",
      "crow_s_feet": "Pattes d'oie",
      "nasolabial_fold": "Sillon nasogénien"
    },
    "intensity": {
      "leve": "Légère",
      "moderada": "Modérée",
      "moderado": "Modéré",
      "alta": "Élevée",
      "intenso": "Intense"
    },
    "regions": {
      "testa": "Front",
      "bochecha_e": "Joue gauche",
      "bochecha_d": "Joue droite",
      "nariz": "Nez",
      "queixo": "Menton"
    },
    "comparison": {
      "baixo": "Faible",
      "moderado": "Modéré",
      "alto": "Élevé"
    },
    "camera": {
      "title": "Prendre une photo",
      "close": "Fermer la caméra",
      "capture": "Capturer la photo",
      "permissionDenied": "Permission de caméra refusée. Veuillez vérifier les paramètres de votre navigateur.",
      "notFound": "Aucune caméra trouvée sur cet appareil.",
      "error": "Impossible d'accéder à la caméra. Veuillez réessayer."
    },
    "landing": {
      "eyebrow": "Conseil cosmétique propulsé par l'IA",
      "title": "Comprenez votre teint de peau avant de choisir votre maquillage.",
      "description": "Lumière analyse les zones du visage, évalue le teint de la peau, met en évidence les indicateurs cutanés et recommande des produits de maquillage via un prototype académique respectueux de la vie privée.",
      "step1": "Téléchargez ou capturez une photo de votre visage.",
      "step2": "Examinez les indicateurs de teint, de zone et d'état de la peau.",
      "step3": "Obtenez des recommandations de produits avec des limites claires.",
      "nonDiagnostic": "Non diagnostique",
      "privacyNotice": "Photo traitée uniquement pour l'analyse",
      "educationalUse": "Conçu comme un prototype à but éducatif",
      "welcomeBack": "Bon retour",
      "signInSubtitle": "Connectez-vous pour continuer, ou utilisez le mode invité pour une analyse rapide.",
      "emailLabel": "E-mail",
      "passwordLabel": "Mot de passe",
      "signInBtn": "Se connecter",
      "guestBtn": "Continuer en tant qu'invité",
      "signUpBtn": "Créer un compte",
      "createAccount": "Créez votre compte",
      "signUpSubtitle": "Créez un compte pour commencer votre analyse de peau.",
      "usernameLabel": "Nom d'utilisateur",
      "confirmPasswordLabel": "Confirmer le mot de passe",
      "passwordMismatch": "Les mots de passe ne correspondent pas.",
      "passwordHint": "Le mot de passe doit contenir au moins 8 caractères, dont une lettre et un chiffre.",
      "submitting": "Veuillez patienter…",
      "logoutBtn": "Se déconnecter"
    }
  },
  "zh": {
    "app": {
      "title": "皮膚分析儀",
      "subtitle": "智慧膚色分析"
    },
    "upload": {
      "title": "上傳一張臉部照片",
      "subtitle": "拖放到這裡，或選擇下方選項",
      "chooseFile": "選擇檔案",
      "useCamera": "使用相機",
      "hint": "JPG、PNG 或 WebP，最大 10MB",
      "errorFormat": "格式無效。請使用 JPG、PNG 或 WebP。",
      "errorSize": "檔案過大。最大大小為 10MB。",
      "or": "或",
      "privacyNotice": "你的照片只會用於本次分析，不會被分享。"
    },
    "preview": {
      "title": "準備好開始分析了嗎？",
      "checklist": [
        "臉部光線充足並置中",
        "不要讓眼鏡或配件遮住臉部",
        "保持自然表情並看向前方",
        "卸妝後分析效果較佳"
      ],
      "analyze": "分析皮膚",
      "changePhoto": "更換照片",
      "consentLabel": "我同意將我的照片用於皮膚分析處理。",
      "consentRequired": "請先同意隱私授權再繼續。"
    },
    "loading": "正在分析你的皮膚...",
    "errors": {
      "tooLarge": "圖片太大。請使用小於 10MB 的圖片。",
      "invalidFormat": "格式無效。請使用 JPG、PNG 或 WebP。",
      "tooSmall": "圖片太小。請使用至少 300x300px 的圖片。",
      "tooDark": "圖片太暗。請改善光線後再試一次。",
      "tooBright": "圖片太亮或曝光過度。請使用較柔和的光線重新拍攝。",
      "noFace": "無法偵測到臉部。請將臉部置中後再試一次。",
      "generic": "分析圖片時發生錯誤。請檢查連線後再試一次。",
      "tryAgain": "再試一次"
    },
    "result": {
      "undertoneLabel": "主要底色",
      "byRegion": "分區分析",
      "uniformity": "均勻度",
      "noImperfections": "未偵測到明顯瑕疵",
      "imperfectionsTitle": "偵測到的瑕疵",
      "toneComparison": "分區膚色比較",
      "newAnalysis": "重新分析",
      "foundationTitle": "粉底色號推薦",
      "foundationSubtitle": "依照你的膚色與底色挑選的色號",
      "findIt": "查看產品",
      "vs": "對比",
      "matchScore": "匹配分數",
      "skinTone": "偵測到的膚色",
      "skinPalette": "您的专属肤色板",
      "healthySkinTone": "健康肤色基准",
      "uniformityMap": "肌肤均匀度分布图",
      "conditionsTitle": "皮肤状况指标",
      "conditionsSubtitle": "脸部区域侦测分割指标"
    },
    "notes": {
      "Area with oily tendency and visible pores": "局部偏油且毛孔较为明显",
      "Even tone with a small sun spot": "肤色均匀，但有一处轻微晒斑",
      "Well-balanced and uniform region": "肤质平衡良好且均匀的区域",
      "T-zone with high oiliness and visible blackheads": "T字部位油脂分泌旺盛且有黑头粉刺",
      "Mild acne in the chin area": "下巴区域有轻微面疱痘痘",
      "Analysis unavailable for this region.": "该区域暂无分析数据。"
    },
    "medicalAlert": {
      "title": "非醫療診斷",
      "message": "Lumière 僅提供化妝品建議與教育用途的原型分析，不提供診斷、治療，也不能取代合格醫療專業人員的建議。",
      "recommendation": "如果你發現皮膚有持續、疼痛、變化、擴散、出血或令人擔心的狀況，請諮詢合格醫療專業人員。"
    },
    "recommendationsBlocked": {
      "title": "已暫停推薦",
      "message": "此結果可能需要先進行醫療評估，因此暫停化妝品推薦。"
    },
    "recommendations": {
      "banner": {
        "spfWarning": "根據偵測到的膚況，建議每天使用 SPF 30+ 防曬，以協助預防色素沉澱加重。"
      },
      "badge": {
        "dermatologicallyTested": "經測試"
      },
      "step": {
        "colorCorrectorTitle": "步驟 1：校色",
        "colorCorrectorDesc": "上粉底前先使用校色產品，協助中和色素沉澱或泛紅。"
      }
    },
    "gdprConsent": {
      "title": "Lumière 臉部照片處理與肌膚分析服務條款",
      "body": "一、 照片處理與目的限制\n\n1. 即時分析：當您使用 Lumière（包含行動應用程式與網頁端）的肌膚分析功能時，系統需要您提供或拍攝一張清楚的臉部照片。\n2. 單次使用：該照片僅會在伺服器中用於即時產生本次化妝品建議與皮膚分析結果。Lumière 承諾在分析流程結束後，不會將您的原始照片檔案用於其他用途、亦不會將照片檔案提供給任何第三方。\n\n二、 分析結果與資料儲存\n\n1. 分析報告留存：為了方便您追蹤肌膚狀況與日後查詢，Lumière 會將分析後產生的數據結果與文字報告（不包含原始照片檔案）儲存於您的個人帳戶中。\n2. 資料自主權：您可以隨時透過帳戶設定，刪除歷史分析紀錄。\n\n三、 非醫療免責聲明\n\n1. 非醫療診斷：Lumière 應用 AI 技術所產生的皮膚分析結果、肌膚年齡、膚質分類及化妝品推薦，純屬美容與護膚建議，不構成、亦不可取代任何專業醫療診斷、照護、預防或治療。\n2. 專業諮詢：Lumière 所提供的任何資訊均不得作為醫療處方。若您的肌膚有紅腫、發炎、病變或其他不適症狀，應立即尋求合格之皮膚科醫生或醫療團隊的協助。Lumière 不承擔因誤將本服務視為醫療建議而導致的任何法律責任。\n\n四、 流程終止與正式授權\n\n1. 自主終止：在您勾選同意並按下「分析皮膚」按鈕之前，您隨時可以自由退出、關閉視窗或返回上一頁以停止本次分析流程。在此情況下，Lumière 不會對您的照片進行任何上傳、處理或傳輸。\n2. 正式授權：一旦您勾選同意並按下「分析皮膚」按鈕送出照片，即表示您已充分理解並正式同意並授權 Lumière 開始處理您的臉部照片以進行本次皮膚分析。",
      "checkbox": "我已閱讀並同意將我的照片用於皮膚分析處理。",
      "retention": "",
      "withdrawal": ""
    },
    "fitzpatrick": {
      "1": "I 型 - 非常白皙，總是曬傷，不會曬黑",
      "2": "II 型 - 白皙，通常會曬傷，很少曬黑",
      "3": "III 型 - 中等膚色，有時曬傷，會逐漸曬黑",
      "4": "IV 型 - 橄欖/小麥膚色，很少曬傷，容易曬黑",
      "5": "V 型 - 深棕膚色，很少曬傷",
      "6": "VI 型 - 深色高色素膚色，幾乎不曬傷",
      "unknown": "未知膚色類型"
    },
    "undertones": {
      "quente": "暖色調（金色、蜜桃色、偏黃）",
      "frio": "冷色調（玫瑰色、偏紅、偏藍）",
      "neutro": "中性色調（冷暖平衡）"
    },
    "undertoneShort": {
      "quente": "暖色",
      "frio": "冷色",
      "neutro": "中性"
    },
    "oiliness": {
      "seco": "乾性",
      "seca": "乾性",
      "normal": "正常",
      "misto": "混合性",
      "mista": "混合性",
      "oleoso": "油性",
      "alta": "偏油",
      "muito_alta": "非常油"
    },
    "imperfections": {
      "poro_dilatado": "毛孔粗大",
      "brilho_excessivo": "出油反光",
      "mancha_solar": "曬斑",
      "cravos": "黑頭",
      "acne_leve": "輕微痘痘",
      "acne_moderada": "中度痘痘",
      "acne_severa": "嚴重痘痘",
      "olheira": "黑眼圈",
      "rugas": "皺紋",
      "hiperpigmentacao": "色素沉澱",
      "acne": "痘痘",
      "mancha": "斑點",
      "poro": "毛孔",
      "linha": "細紋",
      "vermelhidao": "泛紅",
      "outro": "其他"
    },
    "conditions": {
      "vitiligo": "白斑症 (白癜风)",
      "melasma": "黄褐斑 (黑斑)",
      "wine_stain": "鲜红斑痣 (红酒色斑)",
      "forehead_wrinkle": "抬头纹",
      "crow_s_feet": "鱼尾纹",
      "nasolabial_fold": "法令纹"
    },
    "intensity": {
      "leve": "輕微",
      "moderada": "中等",
      "moderado": "中等",
      "alta": "高",
      "intenso": "明顯"
    },
    "regions": {
      "testa": "額頭",
      "bochecha_e": "左臉頰",
      "bochecha_d": "右臉頰",
      "nariz": "鼻子",
      "queixo": "下巴"
    },
    "comparison": {
      "baixo": "低",
      "moderado": "中",
      "alto": "高"
    },
    "camera": {
      "title": "拍攝照片",
      "close": "關閉相機",
      "capture": "拍照",
      "permissionDenied": "相機權限被拒絕。請檢查瀏覽器設定。",
      "notFound": "此裝置未找到相機。",
      "error": "無法存取相機。請再試一次。"
    },
    "landing": {
      "eyebrow": "AI 智能美妆引导",
      "title": "在选择美妆前，深入了解您的肤色与底色。",
      "description": "Lumière 能为您分析面部区域、评估 Fitzpatrick 肤色、检测荒谬的肌肤指标，并基于重视隐私的学术原型工作流为您推荐合适的美妆产品。",
      "step1": "上传或拍摄一张面部照片。",
      "step2": "检视您的肤色、分区细节与异常肤况指标。",
      "step3": "在清晰的合规与免责框架下，获取个性化化妆品推荐。",
      "nonDiagnostic": "非医疗诊断",
      "privacyNotice": "照片仅供实时分析，绝不保留或共享",
      "educationalUse": "专为学术研究与教育原型设计",
      "welcomeBack": "欢迎回来",
      "signInSubtitle": "登录以继续，或使用访客模式进行快速分析。",
      "emailLabel": "电子邮件",
      "passwordLabel": "密码",
      "signInBtn": "登录",
      "guestBtn": "以客身份继续",
      "signUpBtn": "注册",
      "createAccount": "创建账户",
      "signUpSubtitle": "创建账户并开始您的肌肤分析。",
      "usernameLabel": "用户名",
      "confirmPasswordLabel": "确认密码",
      "passwordMismatch": "两次输入的密码不一致。",
      "passwordHint": "密码至少需要 8 个字符，并同时包含字母和数字。",
      "submitting": "请稍候…",
      "logoutBtn": "退出登录"
    }
  },
  "tw": {
    "app": {
      "title": "肌膚分析儀",
      "subtitle": "智慧膚色分析"
    },
    "upload": {
      "title": "上傳一張臉部照片",
      "subtitle": "拖放到這裡，或選擇下方選項",
      "chooseFile": "選擇檔案",
      "useCamera": "使用相機",
      "hint": "JPG、PNG 或 WebP，最大 10MB",
      "errorFormat": "格式無效。請使用 JPG、PNG 或 WebP。",
      "errorSize": "檔案過大。最大大小為 10MB。",
      "or": "或",
      "privacyNotice": "你的照片只會用於本次分析，不會被分享。"
    },
    "preview": {
      "title": "準備好開始分析了嗎？",
      "checklist": [
        "臉部光線充足並置中",
        "不要讓眼鏡或配件遮住臉部",
        "保持自然表情並看向前方",
        "卸妝後分析效果較佳"
      ],
      "analyze": "分析肌膚",
      "changePhoto": "更換照片",
      "consentLabel": "我同意將我的照片用於肌膚分析處理。",
      "consentRequired": "請先同意隱私授權再繼續。"
    },
    "loading": "正在分析你的肌膚...",
    "errors": {
      "tooLarge": "圖片太大。請使用小於 10MB 的圖片。",
      "invalidFormat": "格式無效。請使用 JPG、PNG 或 WebP。",
      "tooSmall": "圖片太小。請使用至少 300x300px 的圖片。",
      "tooDark": "圖片太暗。請改善光線後再試一次。",
      "tooBright": "圖片太亮或曝光過度。請使用較柔和的光線重新拍攝。",
      "noFace": "無法偵測到臉部。請將臉部置中後再試一次。",
      "generic": "分析圖片時發生錯誤。請檢查連線後再試一次。",
      "tryAgain": "再試一次"
    },
    "result": {
      "undertoneLabel": "主要底色",
      "byRegion": "分區分析",
      "uniformity": "均勻度",
      "noImperfections": "未偵測到明顯瑕疵",
      "imperfectionsTitle": "偵測到的瑕疵",
      "toneComparison": "分區膚色比較",
      "newAnalysis": "重新分析",
      "foundationTitle": "粉底色號推薦",
      "foundationSubtitle": "依照你的膚色與底色挑選的色號",
      "findIt": "查看產品",
      "vs": "對比",
      "matchScore": "匹配分數",
      "skinTone": "偵測到的膚色",
      "skinPalette": "您的專屬膚色板",
      "healthySkinTone": "健康膚色基準",
      "uniformityMap": "肌膚均勻度分布圖",
      "conditionsTitle": "膚況指標",
      "conditionsSubtitle": "臉部區域偵測分割指標"
    },
    "notes": {
      "Area with oily tendency and visible pores": "局部偏油且毛孔較為明顯",
      "Even tone with a small sun spot": "膚色均勻，但有一處輕微曬斑",
      "Well-balanced and uniform region": "膚質平衡良好且均勻的區域",
      "T-zone with high oiliness and visible blackheads": "T字部位油脂分泌旺盛且有黑頭粉刺",
      "Mild acne in the chin area": "下巴區域有輕微面皰痘痘",
      "Analysis unavailable for this region.": "該區域暫無分析數據。"
    },
    "medicalAlert": {
      "title": "非醫療診斷",
      "message": "Lumière 僅提供化妝品建議與教育用途的原型分析，不提供診斷、治療，也不能取代合格醫療專業人員的建議。",
      "recommendation": "如果你發現皮膚有持續、疼痛、變化、擴散、出血或令人擔心的狀況，請諮詢合格醫療專業人員。"
    },
    "recommendationsBlocked": {
      "title": "已暫停推薦",
      "message": "此結果可能需要先進行醫療評估，因此暫停化妝品推薦。"
    },
    "recommendations": {
      "banner": {
        "spfWarning": "根據偵測到的膚況，建議每天使用 SPF 30+ 防曬，以協助預防色素沉澱加重。"
      },
      "badge": {
        "dermatologicallyTested": "經測試"
      },
      "step": {
        "colorCorrectorTitle": "步驟 1：校色",
        "colorCorrectorDesc": "上粉底前先使用校色產品，協助中和色素沉澱或泛紅。"
      }
    },
    "gdprConsent": {
      "title": "Lumière 臉部照片處理與肌膚分析服務條款",
      "body": "一、 照片處理與目的限制\n\n1. 即時分析：當您使用 Lumière（包含行動應用程式與網頁端）的肌膚分析功能時，系統需要您提供或拍攝一張清楚的臉部照片。\n2. 單次使用：該照片僅會在伺服器中用於即時產生本次化妝品建議與皮膚分析結果.Lumière 承諾在分析流程結束後，不會將您的原始照片檔案用於其他用途、亦不會將照片檔案提供給任何第三方。\n\n二、 分析結果與資料儲存\n\n1. 分析報告留存：為了方便您追蹤肌膚狀況與日後查詢，Lumière 會將分析後產生的數據結果與文字報告（不包含原始照片檔案）儲存於您的個人帳戶中。\n2. 資料自主權：您可以隨時透過帳戶設定，刪除歷史分析紀錄。\n\n三、 非醫療免責聲明\n\n1. 非醫療診斷：Lumière 應用 AI 技術所產生的皮膚分析結果、肌膚年齡、膚質分類及化妝品推薦，純屬美容與護膚建議，不構成、亦不可取代任何專業醫療診斷、照護、預防或治療。\n2. 專業諮詢：Lumière 所提供的任何資訊均不得作為醫療處方。若您的肌膚有紅腫、發炎、病變或其他不適症狀，應立即尋求合格之皮膚科醫生或醫療團隊的協助。Lumière 不承擔因誤將本服務視為醫療建議而導致的任何法律責任。\n\n四、 流程終止與正式授權\n\n1. 自主終止：在您勾選同意並按下「分析皮膚」按鈕之前，您隨時可以自由退出、關閉視窗或返回上一頁以停止本次分析流程。在此情況下，Lumière 不會對您的照片進行任何上傳、處理或傳輸。\n2. 正式授權：一旦您勾選同意並按下「分析皮膚」按鈕送出照片，即表示您已充分理解並正式同意並授權 Lumière 開始處理您的臉部照片以進行本次皮膚分析。",
      "checkbox": "我已閱讀並同意將我的照片用於肌膚分析處理。",
      "retention": "",
      "withdrawal": ""
    },
    "fitzpatrick": {
      "1": "I 型 - 非常白皙，總是曬傷，不會曬黑",
      "2": "II 型 - 白皙，通常會曬傷，很少曬黑",
      "3": "III 型 - 中等膚色，有時曬傷，會逐漸曬黑",
      "4": "IV 型 - 橄欖/小麥膚色，很少曬傷，容易曬黑",
      "5": "V 型 - 深棕膚色，很少曬傷",
      "6": "VI 型 - 深色高色素膚色，幾乎不曬傷",
      "unknown": "未知膚色類型"
    },
    "undertones": {
      "quente": "暖色調（金色、蜜桃色、偏黃）",
      "frio": "冷色調（玫瑰色、偏紅、偏藍）",
      "neutro": "中性色調（冷暖平衡）"
    },
    "undertoneShort": {
      "quente": "暖色",
      "frio": "冷色",
      "neutro": "中性"
    },
    "oiliness": {
      "seco": "乾性",
      "seca": "乾性",
      "normal": "正常",
      "misto": "混合性",
      "mista": "混合性",
      "oleoso": "油性",
      "alta": "偏油",
      "muito_alta": "非常油"
    },
    "imperfections": {
      "poro_dilatado": "毛孔粗大",
      "brilho_excessivo": "出油反光",
      "mancha_solar": "曬斑",
      "cravos": "黑頭",
      "acne_leve": "輕微痘痘",
      "acne_moderada": "中度痘痘",
      "acne_severa": "嚴重痘痘",
      "olheira": "黑眼圈",
      "rugas": "皺紋",
      "hiperpigmentacao": "色素沉澱",
      "acne": "痘痘",
      "mancha": "斑點",
      "poro": "毛孔",
      "linha": "細紋",
      "vermelhidao": "泛紅",
      "outro": "其他"
    },
    "conditions": {
      "vitiligo": "白斑症",
      "melasma": "黃褐斑",
      "wine_stain": "鮮紅斑痣",
      "forehead_wrinkle": "抬頭紋",
      "crow_s_feet": "魚尾紋",
      "nasolabial_fold": "法令紋"
    },
    "intensity": {
      "leve": "輕微",
      "moderada": "中等",
      "moderado": "中等",
      "alta": "高",
      "intenso": "明顯"
    },
    "regions": {
      "testa": "額頭",
      "bochecha_e": "左臉頰",
      "bochecha_d": "右臉頰",
      "nariz": "鼻子",
      "queixo": "下巴"
    },
    "comparison": {
      "baixo": "低",
      "moderado": "中",
      "alto": "高"
    },
    "camera": {
      "title": "拍攝照片",
      "close": "關閉相機",
      "capture": "拍照",
      "permissionDenied": "相機權限被拒絕。請檢查瀏覽器設定。",
      "notFound": "此裝置未找到相機。",
      "error": "無法存取相機。請再試一次。"
    },
    "landing": {
      "eyebrow": "AI 智慧美妝引導",
      "title": "在選擇美妝前，深入了解您的膚色與底色。",
      "description": "Lumière 能為您分析臉部區域、評估 Fitzpatrick 膚色、偵測顯著的肌膚指標，並基於重視隱私的學術原型工作流為您推薦合適的美妝產品。",
      "step1": "上傳或拍攝一張臉部照片。",
      "step2": "檢視您的膚色、分區細節與異常膚況指標。",
      "step3": "在清晰的合規與免責框架下，獲取個人化化妝品推薦。",
      "nonDiagnostic": "非醫療診斷",
      "privacyNotice": "照片僅供實時分析，絕不保留或共享",
      "educationalUse": "專為學術研究與教育原型設計",
      "welcomeBack": "歡迎回來",
      "signInSubtitle": "登入以繼續，或使用訪客模式進行快速分析。",
      "emailLabel": "電子郵件",
      "passwordLabel": "密碼",
      "signInBtn": "登入",
      "guestBtn": "以訪客身分繼續",
      "signUpBtn": "註冊",
      "createAccount": "建立帳戶",
      "signUpSubtitle": "建立帳戶並開始您的肌膚分析。",
      "usernameLabel": "使用者名稱",
      "confirmPasswordLabel": "確認密碼",
      "passwordMismatch": "兩次輸入的密碼不一致。",
      "passwordHint": "密碼至少需要 8 個字元，並同時包含字母和數字。",
      "submitting": "請稍候…",
      "logoutBtn": "登出"
    }
  },
  "tr": {
    "app": {
      "title": "Cilt Analiz Aracı",
      "subtitle": "Akıllı cilt tonu analizi"
    },
    "upload": {
      "title": "Yüzünüzün bir fotoğrafını yükleyin",
      "subtitle": "Buraya sürükleyip bırakın veya aşağıdan bir seçenek seçin",
      "chooseFile": "Dosya seç",
      "useCamera": "Kamera kullan",
      "hint": "JPG, PNG veya WebP - en fazla 10MB",
      "errorFormat": "Geçersiz format. JPG, PNG veya WebP kullanın.",
      "errorSize": "Dosya çok büyük. Maksimum boyut: 10MB.",
      "or": "veya",
      "privacyNotice": "Fotoğrafınız yalnızca bu analiz için işlenir ve paylaşılmaz."
    },
    "preview": {
      "title": "Analiz etmeye hazır mısınız?",
      "checklist": [
        "Yüz iyi aydınlatılmış ve kadrajda ortalanmış olmalı",
        "Yüzü kapatan gözlük veya aksesuar olmamalı",
        "Nötr ifade ile doğrudan kameraya bakılmalı",
        "En iyi sonuç için makyajsız olunmalı"
      ],
      "analyze": "Cildi analiz et",
      "changePhoto": "Fotoğrafı değiştir",
      "consentLabel": "Fotoğrafımın cilt analizi için işlenmesine izin veriyorum.",
      "consentRequired": "Devam etmek için lütfen gizlilik onayını kabul edin."
    },
    "loading": "Cildiniz analiz ediliyor...",
    "errors": {
      "tooLarge": "Görsel çok büyük. Lütfen 10MB'dan küçük bir görsel kullanın.",
      "invalidFormat": "Geçersiz format. Lütfen JPG, PNG veya WebP kullanın.",
      "tooSmall": "Görsel çok küçük. Lütfen en az 300x300px bir görsel kullanın.",
      "tooDark": "Görsel çok karanlık. Işığı iyileştirip tekrar deneyin.",
      "tooBright": "Görsel çok parlak veya fazla pozlanmış. Daha yumuşak ışıkla tekrar deneyin.",
      "noFace": "Görselde yüz algılanamadı. Lütfen yüzünüzü ortalayıp tekrar deneyin.",
      "generic": "Görsel analiz edilirken hata oluştu. Bağlantınızı kontrol edip tekrar deneyin.",
      "tryAgain": "Tekrar dene"
    },
    "result": {
      "undertoneLabel": "Baskın alt ton",
      "byRegion": "Bölgeye göre analiz",
      "uniformity": "Eşitlik",
      "noImperfections": "Kusur tespit edilmedi",
      "imperfectionsTitle": "Tespit edilen kusurlar",
      "toneComparison": "Bölgeye göre ton karşılaştırması",
      "newAnalysis": "Yeni analiz",
      "foundationTitle": "Fondöten eşleşmeleri",
      "foundationSubtitle": "Cilt tonunuz ve alt tonunuz için seçilen renkler",
      "findIt": "Ürünü gör",
      "vs": "karşılaştırma",
      "matchScore": "Eşleşme puanı",
      "skinTone": "Algılanan cilt tonu",
      "skinPalette": "Cilt Paletiniz",
      "healthySkinTone": "Sağlıklı Cilt Tonu",
      "uniformityMap": "Cilt Düzgünlüğü Haritası",
      "conditionsTitle": "Algılanan durum göstergeleri",
      "conditionsSubtitle": "Yüz bölgesine göre segmentasyon göstergeleri. Bu tıbbi bir teşhis değildir."
    },
    "notes": {
      "Area with oily tendency and visible pores": "Yağlanma eğilimi olan ve gözeneklerin göründüğü bölge",
      "Even tone with a small sun spot": "Hafif güneş lekeli eşit tonlu bölge",
      "Well-balanced and uniform region": "Dengeli ve eşit dağılımlı bölge",
      "T-zone with high oiliness and visible blackheads": "Yüksek yağlanma ve görünür siyah noktaların olduğu T bölgesi",
      "Mild acne in the chin area": "Çene bölgesinde hafif akne",
      "Analysis unavailable for this region.": "Bu bölge için analiz mevcut değil."
    },
    "medicalAlert": {
      "title": "Tıbbi tanı değildir",
      "message": "Lumière yalnızca kozmetik rehberlik ve eğitim amaçlı prototip analizi sağlar. Tanı koymaz, tedavi etmez ve lisanslı bir sağlık uzmanının tavsiyesinin yerine geçmez.",
      "recommendation": "Kalıcı, ağrılı, değişen, yayılan, kanayan veya endişe verici cilt değişiklikleri fark ederseniz lütfen lisanslı bir sağlık uzmanına danışın."
    },
    "recommendationsBlocked": {
      "title": "Öneriler duraklatıldı",
      "message": "Bu sonuç önce tıbbi değerlendirme gerektirebileceği için makyaj önerileri duraklatıldı."
    },
    "recommendations": {
      "banner": {
        "spfWarning": "Tespit edilen duruma göre, daha fazla pigmentasyonu önlemeye yardımcı olmak için günlük SPF 30+ güneş koruyucu kullanmanızı öneririz."
      },
      "badge": {
        "dermatologicallyTested": "Test edilmiştir"
      },
      "step": {
        "colorCorrectorTitle": "Adım 1: Renk düzeltme",
        "colorCorrectorDesc": "Hiperpigmentasyonu veya kızarıklığı nötrlemek için fondötenden önce renk düzeltici uygulayın."
      }
    },
    "gdprConsent": {
      "title": "Lumière Yüz Fotoğrafı İşleme ve Cilt Analizi Hizmet Şartları",
      "body": "I. Fotoğraf İşleme ve Amaç Sınırlandırması\n\n1. Gerçek Zamanlı Analiz: Lumière'in cilt analizi özelliğini (mobil uygulama ve web portalı dahil) kullandığınızda, sistem yüzünüzün net bir fotoğrafını sağlamanızı veya çekmenizi gerektirir.\n2. Tek Seferlik Kullanım: Fotoğraf, yalnızca bu seansa ait gerçek zamanlı kozmetik önerilerinizi ve cilt analizi sonuçlarınızı oluşturmak amacıyla sunucuda işlenir. Lumière, analiz süreci sona erdikten sonra orijinal fotoğraf dosyanızın başka hiçbir amaçla kullanılmayacağını ve üçüncü taraflarla paylaşılmayacağını taahhüt eder.\n\nII. Analiz Sonuçları ve Veri Depolama\n\n1. Rapor Saklama: Cilt durumunuzu takip etmenizi ve daha sonra erişebilmenizi kolaylaştırmak için Lumière, oluşturulan veri metriklerini ve metin raporlarını (orijinal fotoğraf dosyası hariç) kişisel hesabında saklar.\n2. Veri Kontrolü: İstediğiniz zaman hesap ayarlarınızdan geçmiş analiz kayıtlarınızı silebilirsiniz.\n\nIII. Tıbbi Olmayan Sorumluluk Reddi\n\n1. Tıbbi Tanı Değildir: Lumière'in yapay zeka teknolojisi tarafından oluşturulan cilt analizi sonuçları, cilt yaşı, cilt sınıflandırması ve kozmetik önerileri tamamen güzellik ve cilt bakımı rehberliği amaçlıdır. Profesyonel bir tıbbi tanı, bakım, önleme veya tedavinin yerini almaz ve bunları oluşturmaz.\n2. Resmi Danışmanlık: Lumière tarafından sağlanan hiçbir bilgi tıbbi reçete olarak kabul edilmemelidir. Cildinizde kızarıklık, şişlik, iltihap, lezyon veya başka bir rahatsızlık fark ederseniz hemen uzman bir dermatoloğa veya tıbbi ekibe başvurmalısınız. Lumière, bu hizmetin tıbbi tavsiye olarak değerlendirilmesinden kaynaklanan hiçbir yasal sorumluluğu üstlenmez.\n\nIV. Süreç Sonlandırma ve Resmi Yetkilendirme\n\n1. İsteğe Bağlı Sonlandırma: Onay kutusunu işaretleyip \"Cildi analiz et\" butonuna basmadan önce, analiz sürecini durdurmak için istediğiniz zaman çıkış yapabilir, pencereyi kapatabilir veya bir önceki sayfaya dönebilirsiniz. Bu durumda Lumière fotoğrafınızı yüklemeyecek, işlemeyecek veya iletmeyecektir.\n2. Resmi Yetkilendirme: Onay kutusunu işaretleyip \"Cildi analiz et\" butonuna tıkladığınızda, bu cilt analizinin gerçekleştirilmesi için Lumière'e yüz fotoğrafınızı işleme yetkisini resmi olarak verdiğinizi ve bunu tamamen anladığınızı kabul etmiş olursunuz.",
      "checkbox": "Fotoğrafımın cilt analizi için işlenmesini okudum ve kabul ediyorum.",
      "retention": "",
      "withdrawal": ""
    },
    "fitzpatrick": {
      "1": "Tip I - Çok açık ten, her zaman yanar, hiç bronzlaşmaz",
      "2": "Tip II - Açık ten, genellikle yanar, nadiren bronzlaşır",
      "3": "Tip III - Orta ten, bazen yanar, kademeli bronzlaşır",
      "4": "Tip IV - Zeytin tonu ten, nadiren yanar, kolay bronzlaşır",
      "5": "Tip V - Koyu kahverengi ten, çok nadiren yanar",
      "6": "Tip VI - Yoğun pigmentli ten, hiç yanmaz",
      "unknown": "Bilinmeyen cilt tipi"
    },
    "undertones": {
      "quente": "Sıcak (altın, şeftali, sarımsı)",
      "frio": "Soğuk (pembe, kırmızımsı, mavimsi)",
      "neutro": "Nötr (sıcak ve soğuk dengesi)"
    },
    "undertoneShort": {
      "quente": "Sıcak",
      "frio": "Soğuk",
      "neutro": "Nötr"
    },
    "oiliness": {
      "seco": "Kuru",
      "seca": "Kuru",
      "normal": "Normal",
      "misto": "Karma",
      "mista": "Karma",
      "oleoso": "Yağlı",
      "alta": "Yağlı",
      "muito_alta": "Çok yağlı"
    },
    "imperfections": {
      "poro_dilatado": "Genişlemiş gözenekler",
      "brilho_excessivo": "Aşırı parlaklık",
      "mancha_solar": "Güneş lekesi",
      "cravos": "Siyah noktalar",
      "acne_leve": "Hafif akne",
      "acne_moderada": "Orta akne",
      "acne_severa": "Şiddetli akne",
      "olheira": "Göz altı halkaları",
      "rugas": "Kırışıklıklar",
      "hiperpigmentacao": "Hiperpigmentasyon",
      "acne": "Akne",
      "mancha": "Leke",
      "poro": "Gözenek",
      "linha": "İnce çizgiler",
      "vermelhidao": "Kızarıklık",
      "outro": "Diğer"
    },
    "conditions": {
      "vitiligo": "Vitiligo",
      "melasma": "Melazma",
      "wine_stain": "Şarap lekesi",
      "forehead_wrinkle": "Alın kırışıklığı",
      "crow_s_feet": "Kaz ayakları",
      "nasolabial_fold": "Nasolabial kıvrım"
    },
    "intensity": {
      "leve": "Hafif",
      "moderada": "Orta",
      "moderado": "Orta",
      "alta": "Yüksek",
      "intenso": "Yoğun"
    },
    "regions": {
      "testa": "Alın",
      "bochecha_e": "Sol yanak",
      "bochecha_d": "Sağ yanak",
      "nariz": "Burun",
      "queixo": "Çene"
    },
    "comparison": {
      "baixo": "Düşük",
      "moderado": "Orta",
      "alto": "Yüksek"
    },
    "camera": {
      "title": "Fotoğraf çek",
      "close": "Kamerayı kapat",
      "capture": "Fotoğraf çek",
      "permissionDenied": "Kamera izni reddedildi. Tarayıcı ayarlarınızı kontrol edin.",
      "notFound": "Bu cihazda kamera bulunamadı.",
      "error": "Kameraya erişilemiyor. Lütfen tekrar deneyin."
    },
    "landing": {
      "eyebrow": "Yapay zeka destekli kozmetik rehberliği",
      "title": "Makyajınızı seçmeden önce cilt tonunuzu ve alt tonunuzu anlayın.",
      "description": "Lumière, yüz bölgelerini analiz eder, cilt tonunu tahmin eder, belirgin cilt göstergelerini vurgular ve gizlilik bilincine sahip akademik bir prototip iş akışı kullanarak makyaj ürünleri önerir.",
      "step1": "Bir yüz fotoğrafı yükleyin veya çekin.",
      "step2": "Cilt tonu, bölge ve cilt durumu göstergelerini inceleyin.",
      "step3": "Net sınırlar ve yasal sorumluluk reddi çerçevesinde kozmetik önerileri alın.",
      "nonDiagnostic": "Teşhis amaçlı değildir",
      "privacyNotice": "Fotoğraf yalnızca analiz için işlenir",
      "educationalUse": "Eğitim prototipi kullanımı için geliştirilmiştir",
      "welcomeBack": "Tekrar hoş geldiniz",
      "signInSubtitle": "Devam etmek için giriş yapın veya hızlı analiz için misafir modunu kullanın.",
      "emailLabel": "E-posta",
      "passwordLabel": "Şifre",
      "signInBtn": "Giriş yap",
      "guestBtn": "Misafir olarak devam et",
      "signUpBtn": "Kayıt ol",
      "createAccount": "Hesabınızı oluşturun",
      "signUpSubtitle": "Cilt analizinize başlamak için bir hesap oluşturun.",
      "usernameLabel": "Kullanıcı adı",
      "confirmPasswordLabel": "Şifreyi doğrulayın",
      "passwordMismatch": "Şifreler eşleşmiyor.",
      "passwordHint": "Şifre en az 8 karakter olmalı, bir harf ve bir rakam içermelidir.",
      "submitting": "Lütfen bekleyin…",
      "logoutBtn": "Çıkış yap"
    }
  }
}
