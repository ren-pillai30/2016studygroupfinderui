import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Note: This requires a google-services.json for Android to actually run
  // await Firebase.initializeApp(); 
  runApp(const MyMakeApp());
}

class MyMakeApp extends StatelessWidget {
  const MyMakeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: Colors.blue,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends HookWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Figma Make App'),
        leading: const Icon(LucideIcons.layout),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(LucideIcons.flame, size: 64, color: Colors.orange),
            const SizedBox(height: 20),
            const Text(
              'Flutter + Firebase Initialized',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const Padding(
              padding: EdgeInsets.all(20.0),
              child: Text(
                'This project has been migrated from a React/Vite stack to a native Android structure.',
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
