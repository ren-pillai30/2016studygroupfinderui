import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(); // Initialize Firebase
  runApp(const MyMakeApp());
}

class MyMakeApp extends StatelessWidget {
  const MyMakeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Figma Make File',
      debugShowCheckedModeBanner: false,
      // Replacing your MUI/Emotion theme with Material 3
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: Colors.blue,
        brightness: Brightness.light,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends HookWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Equivalent to useState in React
    final counter = useState(0);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Make File Project'),
        leading: const Icon(LucideIcons.fileJson), // Using Lucide like in your Vite project
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Welcome to your converted project'),
            Text('Value: ${counter.value}', 
                 style: Theme.of(context).textTheme.headlineMedium),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              onPressed: () => counter.value++,
              icon: const Icon(LucideIcons.plus),
              label: const Text('Increment'),
            ),
          ],
        ),
      ),
    );
  }
}
